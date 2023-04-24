const Vendor = require("../Models/vendorModel");
const Category = require("../Models/CategoryModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.SECRET;
const nodemailer = require("nodemailer");
const vendorOTPVerificationSchema = require("../Models/vendorOTPVerificationSchema");
const cloudinary = require("../utility/cloudinary");

const postSignUp = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  try {
    const vendorExist = await Vendor.findOne({ email: email });

    if (vendorExist !== null)
      return res
        .status(200)
        .json({ error: "Vendor already exist ! Please signIn" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await Vendor.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await sendOTPVerificationEmail(result, res);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.PASS,
  },
});

const sendOTPVerificationEmail = async (result, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //hash otp
    const saltRounds = 10;

    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = new vendorOTPVerificationSchema({
      vendorId: result._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    //save the otp record
    await newOTPVerification.save();

    const mailOptions = {
      from: "sinandhanam433gmail.com",
      to: result.email,
      subject: "Radiance Email Verification",
      html: `<p>Enter ${otp} in the app to verify your email address and complete the sign up</p><p>This OTP <b>expires in 1 hour</b>.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        res.status(500).json({ error: "Email not send" });
      } else {
        res.status(200).json({
          status: "pending",
          send: "Verification OTP email sent !",
          data: {
            vendorId: result._id,
            email: result.email,
          },
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const vendorId = req.params.id;
    let { otp } = req.body;
    if (!vendorId || !otp) {
      res.status(200).json({ message: "Empty otp details are not allowed" });
    } else {
      const vendorOTPVerificationRecords =
        await vendorOTPVerificationSchema.find({
          vendorId,
        });
      if (vendorOTPVerificationRecords.length <= 0) {
        //no records found
        res
          .status(200)
          .json({
            message:
              "Account record doesn't exist or has been verified already. Please sign up or log in",
          });
      } else {
        //user otp record exists
        const { expiresAt } = vendorOTPVerificationRecords[0];
        const hashedOTP = vendorOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          //user otp record has expired
          await vendorOTPVerificationSchema.deleteMany({ vendorId });
          res
            .status(200)
            .json({ message: "OTP has expired. Please request again." });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            //supllied otp is wrong
            res
              .status(200)
              .json({ message: "Invalid OTP passed. Check your inbox." });
          } else {
            //success
            await Vendor.updateOne({ _id: vendorId }, { isVerified: true });
            await vendorOTPVerificationSchema.deleteMany({ vendorId });
            res.status(200).json({
              status: "Verified",
              success: "User email verified successfully",
            });
          }
        }
      }
    }
  } catch (error) {}
};

const postSignIn = async (req, res) => {
  const { email, password } = req.body;

  const vendorData = await Vendor.findOne({ email });

  if (vendorData) {
    if (vendorData.is_blocked) {
      return res.json({
        status: "error",
        error: "Vendor is blocked by admin",
      });
    }

    if (!vendorData.isVerified) {
      return res.json({
        status: "error",
        error: "Vendor is not verified. Please SignUp with otp verification",
      });
    }

    const passwordTrue = await bcrypt.compare(password, vendorData.password);

    if (passwordTrue) {
      console.log("vendor logged in");
      const token = jwt.sign(
        {
          _id: vendorData._id,
        },
        tokenSecret
      );
      delete vendorData.password;
      res.json({ status: "ok", token: token, vendorData: vendorData });
    } else {
      res.json({
        status: "error",
        error: "Email or password is incorrect",
      });
    }
  } else {
    res.json({ status: "error", error: "Vendor does not exist please SignUp" });
  }
};

const sendPassResetLink = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email)
      return res
        .status(200)
        .json({ error: "Empty vendor details are not allowed" });

    const oldVendor = await Vendor.findOne({ email });

    if (!oldVendor)
      return res.status(200).json({ error: "Vendor doesn't exist" });

    const token = jwt.sign(
      { _id: oldVendor._id },
      process.env.CLIENTJWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const setVendorToken = await Vendor.findByIdAndUpdate(
      { _id: oldVendor._id },
      { verifyToken: token },
      { new: true }
    );

    if (setVendorToken) {
      const mailOptions = {
        from: "sinandhanam433@gmail.com",
        to: email,
        subject: "Radiance Reset Password Link",
        text: `This Link Valid for 2 minutes http://localhost:3000/vendor/enterPassword/${oldVendor._id}/${setVendorToken.verifyToken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(500).json({ error: "Email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(200)
            .json({
              status: true,
              message: "Please verify your Email to reset Password",
            });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error !" });
  }
};

const verifyVendor = async (req, res) => {
  try {
    const { id, token } = req.params;

    const validVendor = await Vendor.findOne({ _id: id, verifyToken: token });

    const verifyTheToken = jwt.verify(token, process.env.CLIENTJWT_SECRET);

    if (validVendor && verifyTheToken._id) {
      res.status(200).json({ status: true, validVendor });
    } else {
      res.status(200).json({ error: "Vendor is not existing" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const validVendor = await Vendor.findOne({ _id: id, verifyToken: token });

    const verifyTheToken = jwt.verify(token, process.env.CLIENTJWT_SECRET);

    if (validVendor && verifyTheToken._id) {
      const newPassword = await bcrypt.hash(password, 12);

      const setNewVendorPass = await Vendor.findByIdAndUpdate(
        { _id: id },
        { password: newPassword },
        { new: true }
      );

      setNewVendorPass.save();

      res.status(200).json({ status: true, setNewVendorPass });
    } else {
      res.status(200).json({ error: "Vendor does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postParlourDetails = async (req, res) => {
  const {parlourName,ownerName,doorNo,street,city,state,pincode,vendorId,} = req.body;
  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    let images = [...req.body.images];
    
    if(!images || images.length === 0){
      return res.status(200).json({ error: "Images are required"})
    }
    
    let imagesBuffer = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "ParlourImages",
        
        
      });

      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
      });

      console.log("controllerss",imagesBuffer);
    }
    req.body.images = imagesBuffer;

    vendor.parlourDetails = {
      parlourName,
      ownerName,
      doorNo,
      street,
      city,
      state,
      pincode,
      images: imagesBuffer
    };

    const parlourDetails = await vendor.save();
    res
      .status(200)
      .json({ message: "Form data submitted successfully", parlourDetails });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

const categoryList = async (req,res)=> {
  try {
    const categories = await Category.find({ is_blocked: false });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong"});
    console.log(error);
  }
}

const addServices = async (req, res)=> {
  const { categoryName,service, price, description, vendorId,image} = req.body;

  try {
    const category = await Category.findOne({ name: categoryName})
    console.log("vendorId",vendorId);
    const vendor = await Vendor.findById(vendorId);
    
    if(!vendor){
      
      return res.status(404).json({ error: "vendor not found"})
    }

    

       let images = Array.isArray(image) ? image : [image];

       if(!images || images.length === 0){
        return res.status(200).json({ error: "Please upload a Image"})
      }

       let result = await Promise.all(images.map((img) =>
       cloudinary.uploader.upload(img, {
        folder: 'Services',
       })
        ));

        console.log('result:', result);


    const newService = {
      categoryId : category._id,
      service,
      price,
      description,
      image: result.map((res) => ({
        public_id:  res ? res.public_id : null,
        url:  res ? res.secure_url : null,
      })),
    };

    console.log('newService:', newService);

    vendor.services.push(newService);
    await vendor.save();
    
    res.status(200).json({ message : "Service added successfully"})
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
   
    console.log(error);
  }

}

module.exports = {
  postSignUp,
  postSignIn,
  verifyOTP,
  sendPassResetLink,
  verifyVendor,
  changePassword,
  postParlourDetails,
  categoryList,
  addServices
};
