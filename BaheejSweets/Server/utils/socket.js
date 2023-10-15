const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const UserSchema = require('../DB/UserSchema');
const { Request}  = require("../DB/RequestSchema");


const server = http.createServer(app);

let socketToPhoneMap = new Map();
let phoneToSocketMap = new Map();
let io = new Server(server, {
	cors: {
		origin: '*', // replace with your frontend application's URL
		methods: [ 'GET', 'POST', 'PATCH', 'PUT', 'DELETE' ]
	}
});
const jwt = require('jsonwebtoken'); // Assuming you are using jsonwebtoken for tokens
// This middleware function will check if the user has a token
const secret= process.env.TOKEN_SECRET
io.use((socket, next) => {
	const token = socket.handshake.query.token;

	if (!token) return next(new Error('Authentication error'));
	// Verify the token
	jwt.verify(token, secret,async  (err, decoded) => {
		if (err) {
			return next(new Error('Authentication error'));
		}
		//TODO: below insert the proper socket payload a.k.a data to properly verify your user
		// You can attach the decoded payload to the socket instance if you want
		// For this example, I am assuming the payload contains a userId.
    const user = await UserSchema.findById(decoded.userId);
		socket.user = user;

		// Call next() to move to the next middleware (or the connection event if there's no other middleware)
		next();
	});
});
var AdminObj;
var adminObjpopulated=false
io.on('connection', (socket) => {
	console.log(`a user with the role ${socket.user.role} is connecting ${socket.id}`);
	socketToPhoneMap.set(socket.id,socket.user.phoneNumber)
	phoneToSocketMap.set(socket.user.phoneNumber,socket.id)

	if(adminObjpopulated==false && socket.user.role==='admin'){
		AdminObj:{user,sid=socket.id}
		adminObjpopulated = AdminObj!=null || AdminObj!=undefined
	}
	socket.on('send-request', async(data)=>{
		if(!adminObjpopulated){
			socket.emit('admin-not-connected-error',{message:"the store has not opened yet please try at a later time"})
		}
		else{
			const request = new Request({
				userId:socket.user._id,
				userFullName:socket.user.fullName,
				items:data,
				active:true
			})
			await request.save()
			let returnData={
				userToReturnTo:socket.id,
				number:socket.phoneNumber,
				request
			}
			try{
				socket.emit('send-request-to-admin',returnData).to(AdminObj.sid)
			}
			catch(e){
				socket.emit('request-error',{message:`something went wrong wile processing your request ${e.message}`})
			}
			
		}

	});
	//TODO: start prepping the request processed socket do not forget that the data for the socket is the 
	/** 
	 *  @param returnData //TODO that has already been set in the send-request socket event 
	*/
	 
	
	
});

module.exports = { server, app };
