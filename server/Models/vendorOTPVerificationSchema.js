const mongoose = require("mongoose");

const VendorOTPVerificationSchema = mongoose.Schema({
    vendorId: {
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

const vendorOTPVerificationSchema = mongoose.model('VendorToken', VendorOTPVerificationSchema)
module.exports = vendorOTPVerificationSchema;