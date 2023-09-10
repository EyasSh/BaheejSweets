//app configuration
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors= require('cors')
const userRouter= require('./Routes/UserAPI')
const saRouter = require('./Routes/SA.API')
const adminRouter =require('./Routes/AdminAPI')
require('dotenv').config()

const app = express();


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: "*",  // replace with your frontend application's URL
      methods: ["GET", "POST","PATCH","PUT","DELETE"]
    }
  })
app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/super',saRouter)
app.use('/api/admin',adminRouter)
const port = 2500 || process.env.PORT  
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})