const express = require('express');
const socketIo = require('./sockets/socket');
const http = require('http');
const cors= require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
/*
  * the initialize method populates an io instance
 */
 
socketIo.initialize(server);
/*
  *(important) when using socket io accross multiple modules calling the initialize method before calling any of the routers is of essence
  *this is because the io var inside the the socket module would be null if we don't do this
 */
const userRouter= require('./Routes/UserAPI');
const saRouter = require('./Routes/SA.API');
const adminRouter =require('./Routes/AdminAPI');

app.use(express.json());
app.use(cors());
app.use('/api/user',userRouter);
app.use('/api/super',saRouter);
app.use('/api/admin',adminRouter);

const port = 2500 || process.env.PORT;  
server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
