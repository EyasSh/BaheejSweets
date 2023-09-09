//app configuration
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors= require('cors')
require('dotenv').config()

const app = express();
const router = express.Router()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: "*",  // replace with your frontend application's URL
      methods: ["GET", "POST","PATCH","PUT","DELETE"]
    }
  })
app.use(express.json())
app.use(cors())
app.use('/api',router)
const port = 2500 || process.env.PORT  
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})