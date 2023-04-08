const express = require("express");
const router = express.Router();
const adminHelpers = require("../helpers/adminhelpers")



router.route("/adminsignin").post(adminHelpers.postSignIn)
router.route("/userDetails").get(adminHelpers.userDetails)
router.route("/userStatusControl").patch(adminHelpers.userStatusControl)
router.route("/vendorDetails").get(adminHelpers.vendorDetails)
router.route("/vendorStatusControl").patch(adminHelpers.vendorStatusControl)

module.exports = router