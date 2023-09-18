const { Server } = require('socket.io');

let io;

function initialize(server) {
  io = new Server(server, {
    cors: {
      origin: "*",  // replace with your frontend application's URL
      methods: ["GET", "POST","PATCH","PUT","DELETE"]
    }
  });

  io.on("connection",(socket)=>{
    console.log(`a user connected ${socket.id}`);
    socket.on("send_message",(data)=>{
      console.log(data.message);
      socket.broadcast.emit("recieve_message", data);
    });
  });
}

function getIo() {
    if (!io) {
      throw new Error("Socket.io has not been initialized. Please call initialize first.");
    }
    return io;
  }
  

module.exports = { initialize, getIo };
