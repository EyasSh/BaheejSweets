const express = require('express');
const socketIo = require('../sockets/socket')
const userRouter= express.Router()
const Userschema = require('../DB/UserSchema')
const ItemSchema = require('../DB/Items') 
/** 
** The DB/Item/Item is only used for get requests in the user so that they see the item details
** This means that the only person that writes using this schema is the admin
*/

//post request for user sign in/login
userRouter.post('/login',async(req,res)=>{
     const {phoneNumber,fullName}=req.body
     try{
        const user = await Userschema.findOne(phoneNumber)
        if(user){
            res.send("user found"+ user).status(200)
        }
        else{
            const newUser= new Userschema(
                {phoneNumber,fullName}
                )
            await newUser.save();
            res.send("a new user was created")
        }
     }
     catch{
            res.send("a server error occurred in the user login").status(500)
     }
     
})
userRouter.get('/',async(req,res)=>{
     const userToken = req.body.token
     try{
        const items= await ItemSchema.find()
        res.status(200).json(items)
     }catch(error){
            res.status(500).send(error)
     }
     
})
const io = socketIo.getIo()
io.on("connection",(socket)=>{
    console.log(`a user has connected ${socket.id}`)
})

module.exports = userRouter