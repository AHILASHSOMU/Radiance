const Admin = require("../Models/adminModel");
const User = require("../Models/userModel")
const Vendor = require("../Models/vendorModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.SECRET;


const postSignIn = async (req, res) => {
    const { email, password } = req.body;
  

    const adminData = await Admin.findOne({ email });


   if (adminData) {
      
           const passwordTrue = await bcrypt.compare(password, adminData.password)
          
       if (passwordTrue) {
        console.log("Admin entered");
           const token = jwt.sign(
               {
                   email: adminData.email,
               },
               tokenSecret
           );

           res.json({ status: "ok", admin: token });
       } else {
           res.json({
               status: "error",
               error: "Email or password is incorrect",
           });
       }
   } else {
       res.json({ status: "error", error: "Email or password is incorrect" });
   }
}

const userDetails = async (req, res) => {
    try {
        const userDetails = await User.find({isVerified: true});
        res.status(200).json({ users: userDetails});
    } catch (error) {
        console.log(error.message);
    }
}

const userStatusControl = async (req, res) => {
    try {
        const {id} = req.body;
        const user = await User.findByIdAndUpdate({_id: id},[
            { $set: { is_blocked: { $cond: { if: "$is_blocked", then: false, else: true}}}},

        ]);
        res.status(200).json({ updateUser: user});
        
    } catch (error) {
        console.log(error.message);
    }
}

const vendorDetails = async (req, res) => {
    try {
        const vendorDetails = await Vendor.find({isVerified:true});
        res.status(200).json({ vendors: vendorDetails});
    } catch (error) {
        console.log(error.message);
    }
}

const vendorStatusControl = async (req, res) => {
    try {
        const {id} = req.body;
        const vendor = await Vendor.findByIdAndUpdate({_id: id},[
            { $set: { is_blocked: { $cond: { if: "$is_blocked", then: false, else: true}}}},

        ]);
        res.status(200).json({ updateVendor: vendor});
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    postSignIn,
    userDetails,
    userStatusControl,
    vendorDetails,
    vendorStatusControl

}