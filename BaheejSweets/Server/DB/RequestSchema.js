const mongoose = require('mongoose');

const UserItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
},); // We set _id to false to prevent Mongoose from creating an ID for each item

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // This assumes you have a User model defined elsewhere in your project
    required: true,
  },
  userFullName: {
    type: String,
    required: true,
  },
  items: {
    type: [UserItemSchema], // This indicates an array of itemSchema objects
    required: true,
  },
  active:{
    type:Boolean,
    required:true
  },
  requestTime:{
    type:Date,
    default:Date.now
  }
});
const UserItem = mongoose.model('UserItem', UserItemSchema);


const Request = mongoose.model('Request', requestSchema);

module.exports = {UserItem,Request} ;
