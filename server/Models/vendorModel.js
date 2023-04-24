const mongoose = require ('mongoose')

const vendorSchema = new mongoose.Schema({
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
    isVendor:{
        type: Boolean,
        default: false,
    },
    parlourDetails:{
        parlourName:{
            type: String
        },
        ownerName:{
            type:String
        },
        doorNo:{
            type:String
        },
        street:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        pincode:{
            type:String
        },
        images:[
            {
                public_id:{
                    type: String,
                    required: true
                },
                url:{
                    type:String,
                    required: true
                }

            }
        ]
    },
    services:[{
        categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
        },
        service:{
            type: String 
        },
        price:{
            type: Number
        },
        description:{
            type: String
        },
        image: [{
            public_id: {
              type: String,
              required: true
            },
            url: {
              type: String,
              required: true
            }
          }]
    }],
    verifyToken: {
        type: String
    },
})

module.exports = mongoose.model("Vendor", vendorSchema);