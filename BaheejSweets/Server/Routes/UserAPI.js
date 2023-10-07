const express = require('express');
const userRouter= express.Router()
const Userschema = require('../DB/UserSchema')
const ItemSchema = require('../DB/Items') 
/** 
** The DB/Item/Item is only used for get requests in the user so that they see the item details
** This means that the only person that writes using this schema is the admin
//TODO: create a post request for adding an item and a request for updating a price of an already existing item
*/
/**
 * *Middlewares start
 */
async function requireRole(...roles) {
    return async (req, res, next) => {
        try {
            const user = await Userschema.findOne({ phoneNumber: req.body.phoneNumber });

            if (!user) {
                return res.status(404).send('User not found');
            }

            const hasRequiredRole = roles.some(role => user.role === role);

            if (!hasRequiredRole) {
                return res.status(403).send('Access denied');
            }

            req.user = user;  // If needed later in the middleware chain
            next();

        } catch (error) {
            res.status(500).send('Internal server error');
        }
    };
}

//post request for user sign in/login
userRouter.post('/login',async(req,res)=>{
     const {phoneNumber,fullName}=req.body
     try{
        const user = await Userschema.findOne(phoneNumber)
        if(user){
            res.send("user found"+ user).status(200)
        }
        else{
            //TODO: create a way to promote a user to an admin in the SA API
            const newUser= new Userschema(
                {phoneNumber,fullName,role:'user'}
                )
            await newUser.save();
            res.send("a new user was created")
        }
     }
     catch{
            res.send("a server error occurred in the user login").status(500)
     }
     
})
userRouter.get('/fetchitems',async(req,res)=>{
     const userToken = req.body.token
     try{
        const items= await ItemSchema.find()
        res.status(200).json(items)
     }catch(error){
            res.status(500).send(error)
     }
     
})


module.exports = userRouter