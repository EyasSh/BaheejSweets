const http = require('http')
const { Server } = require('socket.io');
const app= require('./app')
const UserSchema = require('../DB/UserSchema')

const server =  http.createServer(app)


let socketToPhoneMap = new Map();
let phoneToSocketMap= new Map();
let io = new Server(server, {
    cors: {
      origin: "*",  // replace with your frontend application's URL
      methods: ["GET", "POST","PATCH","PUT","DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`a user is connecting ${socket.id}`);
    
    // Listen for authenticate event from the client
    socket.on("authenticate", async (data) => {
      try {
        const user = await UserSchema.findOne({ phoneNumber: data.phoneNumber });
        if (user) {
          console.log(`The user ${user.fullName} with the role of ${user.role} has logged on with the socket id of: ${socket.id}`);
        } else {
          console.log("User not found!");
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
      }
    });
  

  });

module.exports = {server, app };
