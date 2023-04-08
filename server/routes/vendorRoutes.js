const express = require("express");
const router = express.Router();
const vendorHelpers = require("../helpers/vendorHelpers");


router.route("/signup").post(vendorHelpers.postSignUp)
router.route("/verifyOTP/:id").post(vendorHelpers.verifyOTP);
router.route("/signin").post(vendorHelpers.postSignIn)
router.route("/resetLink").post(vendorHelpers.sendPassResetLink);
router.route("/forgotPassword/:id/:token").get(vendorHelpers.verifyVendor);
router.route("/changePassword/:id/:token").post(vendorHelpers.changePassword);




module.exports = router