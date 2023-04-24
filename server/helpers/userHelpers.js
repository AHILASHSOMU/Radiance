const User = require("../Models/userModel");
const Vendor = require("../Models/vendorModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.SECRET;
const { CLIENT_URL } = process.env;
const sendMail = require("./sendMail");
const nodemailer = require("nodemailer");
const userOTPVerificationSchema=require ("../Models/userOTPVerificationSchema");
const ACTIVATION_TOKEN_SECRET = process.env.ACTIVATION_TOKEN_SECRET;

//for send mail
// const sendVerifyMail = async (name, email, user_id) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: "sinandhanam433@gmail.com",
//         pass: "",
//       },
//     });
//     const mailOptions = {
//       from: "sinandhanam433@gmail.com",
//       to: email,
//       subject: "For Verification mail",
//       html:
//         "<p>Hi " +
//         name +
//         ',please click here to <a href="http://localhost:3000/verify?id=' +
//         user_id +
//         '">Verify </a> your mail.</p> ',
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email has been sent:", info.response);
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const postSignUp = async (req, res) => {
  
    const { name, email, phoneNumber, password } = req.body;
    try {

    const userExist = await User.findOne({ email: email });

    if (userExist !==null)
    return res.status(200).json({ error: "User already exist ! Please signIn" })

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    })

    await sendOTPVerificationEmail(result, res)
   
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
    console.log(error);
  }
};

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.PASS
  }
})

const sendOTPVerificationEmail = async (result, res) => {
  try {

    const otp = `${Math.floor(1000 + Math.random() *9000)}`;

    //hash otp
    const saltRounds = 10

    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = new userOTPVerificationSchema({
      userId: result._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000

    })

    //save the otp record
    await newOTPVerification.save()

    const mailOptions = {
      from: "sinandhanam433gmail.com",
      to: result.email,
      subject: "Radiance Email Verification",
      html: `<p>Enter ${otp} in the app to verify your email address and complete the sign up</p><p>This OTP <b>expires in 1 hour</b>.</p>`
  }

  transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      console.log('error', error);
      res.status(500).json({ error: 'Email not send' })
    }else {
      res.status(200).json({
        status: "pending",
        send: "Verification OTP email sent !",
        data: {
            userId: result._id,
            email: result.email,
        }
    })
    }
  })
    
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

const verifyOTP = async (req, res) =>{
  try {
    const userId = req.params.id;
    let { otp } = req.body
    if(!userId || !otp) {
      res.status(200).json({ message: 'Empty otp details are not allowed'})
    }else{
      const userOTPVerificationRecords = await userOTPVerificationSchema.find({
        userId,
      });
      if (userOTPVerificationRecords.length <= 0){
        //no records found
        res.status(200).json({ message: "Account record doesn't exist or has been verified already. Please sign up or log in"})
      } else {
        //user otp record exists
        const { expiresAt } = userOTPVerificationRecords[0]
        const hashedOTP = userOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
            //user otp record has expired
            await userOTPVerificationSchema.deleteMany({ userId });
            res.status(200).json({ message: "OTP has expired. Please request again." })
        } else {
            const validOTP = await bcrypt.compare(otp, hashedOTP);

            if (!validOTP) {
                //supllied otp is wrong
                res.status(200).json({ message: "Invalid OTP passed. Check your inbox." })
            } else {
                //success
                await User.updateOne({ _id: userId }, { isVerified: true });
                await userOTPVerificationSchema.deleteMany({ userId });
                res.status(200).json({
                    status: 'Verified',
                    success: 'User email verified successfully'
                })
            }
        }
    }
    }
  } catch (error) {
    
  }
}

const resendOTP = async (req, res) => {
  try {
    const email = req.body.email

    if(!email)
    return req.status(200).json({ message: "Empty user details are not allowed"})

    const oldUser = await User.findOne({ email });

    if(!oldUser)
    return res.status(200).json({ message: "User doesn't exist"});

    if (oldUser.isVerified === true)
    return res.status(200).json({ message: "Already Verified Please do login !" })

    const userId = oldUser._id;

    await userOTPVerificationSchema.deleteMany({ userId })
    sendOTPVerificationEmail(oldUser, res)

  } catch (error) {
    res.status(500).json({ status: "Failed", message: error.message })
  }
}

const sendPassResetLink = async (req, res) => {
  try {
      const email = req.body.email;

      if (!email)
          return res.status(200).json({ error: "Empty user details are not allowed" })

      const oldUser = await User.findOne({ email });

      if (!oldUser)
          return res.status(200).json({ error: "User doesn't exist" })

      const token = jwt.sign({ _id: oldUser._id }, process.env.CLIENTJWT_SECRET, {
          expiresIn: '1d'
      })

      const setUserToken = await User.findByIdAndUpdate({ _id: oldUser._id },{ verifyToken: token }, { new: true })

      if (setUserToken) {
          const mailOptions = {
              from: "sinandhanam433@gmail.com",
              to: email,
              subject: "Radiance Reset Password Link",
              text: `This Link Valid for 2 minutes http://localhost:3000/enterPassword/${oldUser._id}/${setUserToken.verifyToken}`
          };

          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log('error', error);
                  res.status(500).json({ error: 'Email not send' })
              } else {
                  console.log('Email sent', info.response);
                  res.status(200).json({ status: true, message: 'Please verify your Email to reset Password' })
              }
          })
      }
  }
  catch (error) {
      res.status(500).json({ error: 'Internal server error !' })
  }
}

const verifyUser = async (req, res) => {
  try {
      const { id, token } = req.params;

      const validUser = await User.findOne({ _id: id, verifyToken: token });

      const verifyTheToken = jwt.verify(token, process.env.CLIENTJWT_SECRET);

      if (validUser && verifyTheToken._id) {
          res.status(200).json({ status: true, validUser })
      } else {
          res.status(200).json({ error: 'User is not existing' })
      }
  }
  catch (error) {
      res.status(500).json({ error: error.message, })
  }
}

const changePassword = async (req, res) => {
  try {
      const { id, token } = req.params;
      const { password } = req.body;

      
      const validUser = await User.findOne({ _id: id, verifyToken: token });

      const verifyTheToken = jwt.verify(token, process.env.CLIENTJWT_SECRET);

      if (validUser && verifyTheToken._id) {

        
          const newPassword = await bcrypt.hash(password, 12)

          const setNewUserPass = await User.findByIdAndUpdate({ _id: id }, { password: newPassword }, { new: true })

          setNewUserPass.save();

          res.status(200).json({ status: true, setNewUserPass })
      } else {
          res.status(200).json({ error: 'User does not exist' })
      }
  }
  catch (error) {
      res.status(500).json({ error: error.message, })
  }
}  


const postSignIn = async (req, res) => {
  const { email, password } = req.body;

  const userData = await User.findOne({ email });

  if (userData) {
    
    if (userData.is_blocked) {
      return res.json({
        status: "error",
        error: "User is blocked by admin",
      });
    }

    if(!userData.isVerified){
      return res.json({
        status: "error",
        error: "User is not verified. Please SignUp with OTP verification",
      })
    }

    const passwordTrue = await bcrypt.compare(password, userData.password);

    if (passwordTrue) {
      console.log("user logged in");
      const token = jwt.sign(
        {
          _id: userData._id,
        },
        tokenSecret
      );
      delete userData.password
      res.json({ status: "ok", token: token, userData: userData });
    } else {
      res.json({
        status: "error",
        error: "Email or password is incorrect",
      });
    }
  } else {
    res.json({ status: "error", error: "User does not exist please SignUp" });
  }
};



const verifyMail = async (req, res) => {
  try {
    const updatedInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: 1 } }
    );

    console.log(updatedInfo);
    res.render("email-verified");
  } catch (error) {
    console.log(error.message);
  }
};

const getAddress = async (req, res)=>{
  id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({message:"User not found"});
    }
    const address = user.address;
    return res.status(200).json(address);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

const userAddAddress = async (req, res)=> {
    id = req.params.id;
    const {DoorNo, Street, Landmark, City, State, Pincode} = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(
      {_id: id},
      {$set: {address:{
        DoorNo,
        Street,
        Landmark,
        City,
        State,
        Pincode
      }}},
      {new: true}
    )

    if(updatedUser) {
      return res.status(200).json({success: true, message: "Address added successfully"})
    }else{
      return res.status(404).json({success: false, message:"User not found"});
    }
    
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success: false, message: "Error adding address"});
  }
}

const parloursList = async (req, res) => {
  try {
    
    const vendors = await Vendor.find({  $and: [{ is_blocked: false }, { isVendor: true }], }).populate('parlourDetails');
     
    res.status(200).json(vendors);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const parlourDetailsAndServices = async (req,res) => {
  
  try {
    const parlourDetailsServices = await Vendor.findById(req.params.parlourId)
    .populate({
      path: 'services.categoryId',
      select: 'name',
  })
  .exec();
  res.status(200).json({parlourDetailsServices})
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  postSignUp,
  postSignIn,
  verifyMail,
  verifyOTP,
  resendOTP,
  sendPassResetLink ,
  verifyUser,
  changePassword,
  getAddress,
  userAddAddress,
  parloursList,
  parlourDetailsAndServices
};
