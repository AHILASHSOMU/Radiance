const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  is_blocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false
},
address:{
  DoorNo:{
    type:String
  },
  Street:{
    type:String
  },
  Landmark:{
    type:String
  },
  City:{
    type:String
  },
  State:{
    type:String
  },
  Pincode:{
    type:String
  },
},
verifyToken: {
  type: String
},

});

module.exports = mongoose.model("user", userSchema);
