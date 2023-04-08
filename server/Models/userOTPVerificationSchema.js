const mongoose = require("mongoose");

const UserOTPVerificationSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    },
}) 

const userOTPVerificationSchema = mongoose.model('Token', UserOTPVerificationSchema)
module.exports = userOTPVerificationSchema;