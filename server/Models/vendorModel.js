const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required:true,
        trim:true
    },
    phoneNumber: {
        type: Number,
        required:true,
        trim:true
    },
    password: {
        type: String,
        required:true,
        trim:true
    },
    is_blocked:{
        type: Boolean,
        default:false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    },
})

module.exports = mongoose.model("Vendor", userSchema);