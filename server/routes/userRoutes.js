const express = require("express");
const router = express.Router();
const userHelpers = require("../helpers/userHelpers");




router.route("/user/signup").post(userHelpers.postSignUp)
router.route("/user/verifyOTP/:id").post(userHelpers.verifyOTP)
// router.route("/user/activation").post(userHelpers.activateEmail)
router.route("/user/signin").post(userHelpers.postSignIn);
router.route("/user/resendOTP").post(userHelpers.resendOTP);
router.route("/user/resetLink").post(userHelpers.sendPassResetLink);
router.route("/user/forgotPassword/:id/:token").get(userHelpers.verifyUser);
router.route("/user/changePassword/:id/:token").post(userHelpers.changePassword);
router.route("/user/addAddress/:id").post(userHelpers.userAddAddress)
router.route("/user/parloursList").get(userHelpers.parloursList);
router.route("/user/parlourSingleViewPage/:parlourId").get(userHelpers.parlourDetailsAndServices);
router.route("/user/getAddress/:id").get(userHelpers.getAddress);


module.exports = router