const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    is_blocked: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("category", categorySchema)