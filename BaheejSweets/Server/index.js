const {server, app} = require('./utils/socket')
const mongoose = require('mongoose')
require('dotenv').config();
const userRouter = require("./Routes/UserAPI")
const saRouter = require('./Routes/SA.API')
const  adminRouter = require("./Routes/AdminAPI");

const uri = 'mongodb://127.0.0.1:27017/BaheejDB'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// To use Node.js' built-in Promise library
mongoose.Promise = global.Promise
app.use('/api/user', userRouter);
app.use('/api/super', saRouter);
app.use('/api/admin', adminRouter);

const port = 2500 || process.env.PORT;  
server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
