const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
atlasurl = process.env.ATLASURL;

const connectToDatabase = () => {
    mongoose
        .connect(atlasurl)
        .then(() => console.log("MongoDB connected...."))
        .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = connectToDatabase;