const {server, app} = require('./utils/socket')
require('dotenv').config();
const userRouter = require("./Routes/UserAPI")
const saRouter = require('./Routes/SA.API')
const  adminRouter = require("./Routes/AdminAPI");

app.use('/api/user', userRouter);
app.use('/api/super', saRouter);
app.use('/api/admin', adminRouter);

const port = 2500 || process.env.PORT;  
server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
