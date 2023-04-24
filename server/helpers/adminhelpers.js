const Admin = require("../Models/adminModel");
const User = require("../Models/userModel")
const Vendor = require("../Models/vendorModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.SECRET;
const Category = require ("../Models/CategoryModel")


const postSignIn = async (req, res) => {
    const { email, password } = req.body;

  const adminData = await Admin.findOne({ email });
  
   if (adminData) {
      
           const passwordTrue = await bcrypt.compare(password, adminData.password)
          
       if (passwordTrue) {
        console.log("Admin entered");
           const token = jwt.sign(
               {
                   _id: adminData._id,
               },
               tokenSecret
           );

           res.json({ status: "ok", token: token, adminData: adminData });
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

const addCategory = async (req, res)=> {
    try {       
      const name = req.body.inputValue;        
      if(name){
        const categoryExists = await addCategoryToDatabase(name)
        if(categoryExists){
            res.status(200).json({status:"Category already exist"})
        }else{
            res.status(200).json({status:"Category added"})
        }
        
      } else {
        res.status(400).json({status:"name is required"})
      }        
    } catch (error) {
      console.log(error.message);
      res.status(500).json({status:"error occurred while adding service"})
    }
  }

  const addCategoryToDatabase = async (name) => {
    try {
      const existingCategory = await Category.findOne({ name });
      if(existingCategory) {
        return true;
      }
      await Category.create({
        name
      })
      return false;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error occurred while adding Category");
    }
  }

  const findCategory = async (req, res)=> {
    try {
        const allCategory = await Category.find({});
        
        res.status(200).json({ Categories: allCategory });
    } catch (error) {
        console.log(error.message);
    }
  }

  const categoryStatusControl = async (req, res)=>{
    try {
        const {id} = req.body;
        const category = await Category.findByIdAndUpdate({_id:id},[
            { $set: { is_blocked: { $cond: { if: "$is_blocked", then: false, else: true}}}},
        ])
        res.status(200).json({ categoryStatus: category});
    } catch (error) {
        console.log(error.message);
    }
  }

  const vendorsRequest = async (req, res)=>{
    try {
        const vendorsRequest = await Vendor.find({
            "parlourDetails": { "$exists": true },
            "services": { "$exists": true }
        })
        res.status(200).json({ vendorsDetails : vendorsRequest });
    } catch (error) {
        console.log(error.message);
    }
  }

  const vendorDetailsAndServices = async (req, res) => {
    try {
        
        const vendorsDetailsServices = await Vendor.findById(req.params.vendorId)
        .populate({
            path: 'services.categoryId',
            select: 'name',
        })
        .exec();
        res.status(200).json({vendorsDetailsServices});

    } catch (error) {
        console.log(error.message);
    }
  }

const acceptVendor = async(req, res) =>{
    try {
        const acceptedVendor = await Vendor.findByIdAndUpdate(req.params.vendorId,{isVendor:true});
        res.status(200).json({acceptedVendor,message:"Vendor accepted"})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    postSignIn,
    userDetails,
    userStatusControl,
    vendorDetails,
    vendorStatusControl,
    addCategory,
    findCategory,
    categoryStatusControl,
    vendorsRequest,
    vendorDetailsAndServices,
    acceptVendor

}