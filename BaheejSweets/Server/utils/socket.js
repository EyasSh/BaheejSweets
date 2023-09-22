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
    console.log(`a user connected ${socket.id}`);
    
    // Listen for authenticate event from the client
    socket.on("authenticate", async (data) => {
      try {
        const user = await UserSchema.findOne({ phoneNumber: data.phoneNumber });
        if (user) {
          console.log(`User ${user.fullName} is a ${user.role}`);
        } else {
          console.log("User not found!");
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
      }
    });
  

  });

module.exports = {server, io,socketToPhoneMap,phoneToSocketMap, app };
