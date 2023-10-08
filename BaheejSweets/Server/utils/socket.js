const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const UserSchema = require('../DB/UserSchema');

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
io.use((socket, next) => {
	const token = socket.handshake.query.token;

	if (!token) return next(new Error('Authentication error'));
	// Verify the token
	jwt.verify(token, 'YOUR_SECRET_KEY',async  (err, decoded) => {
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
io.on('connection', (socket) => {
	console.log(`a user with the role ${socket.user.role} is connecting ${socket.id}`);

	// Listen for authenticate event from the client
	socket.on('authenticate', async (data) => {
		try {
			const user = await UserSchema.findOne({ phoneNumber: data.phoneNumber });
			if (user) {
				console.log(
					`The user ${user.fullName} with the role of ${user.role} has logged on with the socket id of: ${socket.id}`
				);
			} else {
				console.log('User not found!');
			}
		} catch (error) {
			console.error('Error authenticating user:', error);
		}
	});
});

module.exports = { server, app };
