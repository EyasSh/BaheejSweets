const express = require('express');
const userRouter= express.Router()
const Userschema = require('../DB/UserSchema')
const ItemSchema = require('../DB/Items') 
const JWT= require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config();
/** 
** The DB/Item/Item is only used for get requests in the user so that they see the item details
** This means that the only person that writes using this schema is the admin
//TODO: create a post request for adding an item and a request for updating a price of an already existing item
*/
/**
 * *Middlewares start
 */
function requireRole(role) {
    return async (req, res, next) => {
        try {
            const user = await Userschema.findOne({ phoneNumber: req.body.phoneNumber });

            if (!user) {
                return res.status(404).send('User not found');
            }

            const hasRequiredRole = role===user.role;

            if (!hasRequiredRole) {
                return res.status(403).send('Access denied');
            }

            req.user = user;  // If needed later in the middleware chain
            next();

        } catch (error) {
            res.status(500).send('Internal server error'+error);
        }
    };
}
function generateToken(user){
    let expiresIn;
    if(user.role==='admin'){
        expiresIn = '14h'
    }
    else{
        expiresIn='7d'
    }
    const payload= {
        userId:user._id,
        userNumber:user.phoneNumber,
        userRole:user.role
    }
    const token = JWT.sign(payload,process.env.TOKEN_SECRET,{expiresIn})
    return token
}
function authenticateJWT(req,res,next){
    const authHeader= req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];  // "Bearer TOKEN"

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);  // Forbidden, token is no longer valid
            }

            req.user = user;  // Attach the decoded payload to the request object
            next();
        });
    } else {
        res.sendStatus(401);  // Unauthorized, no token provided
    }
}
/**
 * *Middlewares end
 */

//post request for user sign in/login
userRouter.post('/login', async (req, res) => {
    const { role, phoneNumber, fullName } = req.body;

    try {
        const user = await Userschema.findOne({ phoneNumber: phoneNumber });

        if (user) {
            const token = generateToken(user);
            return res.status(200).json({ message: "user found", token });
        } else {
             //TODO: create a way to promote a user to an admin in the SA API
            const newUser = new Userschema({
                phoneNumber,
                fullName,
                role: 'user'
            });

            await newUser.save();
            const token = generateToken(newUser);
            return res.status(200).json({ message: "a new user was created", token });
        }
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).send("a server error occurred during user login");
    }
});

userRouter.get('/fetchitems',authenticateJWT,async(req,res)=>{
     const userToken = req.body.token
     try{
        const items= await ItemSchema.find()
        res.status(200).json(items)
     }catch(error){
            res.status(500).send(error)
     }
     
})
userRouter.post('/addItem',authenticateJWT, requireRole('admin'),async(req,res)=>{
    const{item,token} = req.body
    if(!item){
        res.status(400).send('bad request')
    }
    /**
     * *The following code will check for an item's existance
     */
    const itemExistsAlready = await ItemSchema.findOne(
        $or[
            {name:item.name},
            {price:item.price}
        ]
    )
    if(itemExistsAlready){
        res.status(409).send("an item with a similar price or name already exits")
    }
    try{
        const newItem = new ItemSchema(
            {name:item.name,price:item.price}
        )
        await newItem.save()
        res.send(`${item.name} has been added successfully`).status(200)
    }catch{
        console.error("an error occurred in adding the item")
        res.status(500).send("an error occurred in adding the item "+item.name)
    }
})
userRouter.patch('/updateItem',authenticateJWT,requireRole('admin'),async(req,res)=>{
    const item=req.body
    if (!item || !item.id) {
        return res.status(400).send('Item not sent or ID missing');
    }
    try{
       const fetchItem = await ItemSchema.findById(item.id)
       if(!fetchItem){
            res.status(404).send("item not found")
       }
       for (let key in item) {
        if (item.hasOwnProperty(key) && key !== 'id') { // Do not overwrite the ID
            fetchItem[key] = item[key];
        }
    }

    await fetchItem.save();
    res.status(200).json(fetchItem);

    }catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal server error');
    }
})
userRouter.delete('deleteItem',authenticateJWT,requireRole('admin'),async(req,res)=>{
    //TODO: in the code review ask firas if you should change the token variable here to user obj
    const item = req.body
    if(!item){
        res.status(400).send('bad request')
    }
    else{
        try{
            const itemToDel= await ItemSchema.findByIdAndDelete(item.id)
            if(!item){
                res.status(404).send(`the item you are trying to delete does not exist or is already deleted`)
            }
        }
        catch{
            res.status(500).send("Internal server error while trying to delete an item")
        }
    }

})

module.exports = userRouter