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
userRouter.post('/addItem', requireRole('admin'),async(req,res)=>{
    const{item,token} = req.body
    if(!item){
        res.status(400).send('bad request')
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
userRouter.patch('/updateItem',requireRole('admin'),async(req,res)=>{
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


module.exports = userRouter