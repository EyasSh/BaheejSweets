const express = require('express');
const userRouter= express.Router()
const Userschema = require('../DB/UserSchema')

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
module.exports = userRouter