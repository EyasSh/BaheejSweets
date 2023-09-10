const mongoose = require('mongoose')
const ItemSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        price:{
            type:Number,
            required:true
        }
    },
)
const Item= mongoose.model("Items",ItemSchema)
module.exports= Item