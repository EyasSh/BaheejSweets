const mongoose = require('mongoose')
const Userschema = new mongoose.Schema(
    {
        fullName:{type:String,required:true},
        phoneNumber:{type:String,required:true,unique:true}
    }
)
const User= mongoose.model("User",Userschema) 
module.exports= User