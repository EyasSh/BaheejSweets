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

	if (phoneToSocketMap.has(socket.user.phoneNumber)) {
		const oldSocketId = phoneToSocketMap.get(socket.user.phoneNumber);
		socketToPhoneMap.delete(oldSocketId);
	  }
	
	  socketToPhoneMap.set(socket.id, socket.user.phoneNumber);
	  phoneToSocketMap.set(socket.user.phoneNumber, socket.id);
	

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
				userId:socket.user._id,
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
	 * * The below socket is a socket sent by the admin back to the user as response to the user about the request status
	*/
	app.post('/processRequest', async (req, res) => {
		const data = req.body; // Get the data sent by the client
		
		let request = data.request;
	
		try {
			const updatedRequest = await Request.findOneAndUpdate(
				{ userId: request.userId, active: true }, // Query criteria
				{ active: false },                         // Update
				{ new: true }                              // Returns the updated document
			);
	
			if (!updatedRequest) {
				return res.status(404).json({ message: 'No active request found for the user.' });
			}
	
			// Using Socket.io to notify the client about the processed request
			io.to(data.userToReturnTo).emit("items-ready", { message: `Your items are ready: ${data.request.items}` });
	
			return res.status(200).json({ message: 'Request processed successfully!' });
		} catch (e) {
			console.error('Error while processing request:', e.message);
			return res.status(500).json({ message: `An error occurred while processing the request: ${e.message}` });
		}
	});
	/**
	 * * disconnect event
	 */
	socket.on('disconnect', () => {
		console.log(`User with phone ${socket.user.phoneNumber} and socket ${socket.id} disconnected`);
		socketToPhoneMap.delete(socket.id);
		phoneToSocketMap.delete(socket.user.phoneNumber);
	  });
	 
	
});

module.exports = { server, app };
