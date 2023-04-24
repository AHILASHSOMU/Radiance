const express = require("express");
const router = express.Router();
const adminHelpers = require("../helpers/adminhelpers")



router.route("/adminsignin").post(adminHelpers.postSignIn);
router.route("/userDetails").get(adminHelpers.userDetails);
router.route("/userStatusControl").patch(adminHelpers.userStatusControl);
router.route("/vendorDetails").get(adminHelpers.vendorDetails);
router.route("/vendorStatusControl").patch(adminHelpers.vendorStatusControl);
router.route("/addCategory").post(adminHelpers.addCategory);
router.route("/categoryStatusControl").patch(adminHelpers.categoryStatusControl)
router.route("/findCategory").get(adminHelpers.findCategory);
router.route("/vendorsRequest").get(adminHelpers.vendorsRequest);
router.route("/vendorDetailsAndServices/:vendorId").get(adminHelpers.vendorDetailsAndServices)
router.route("/acceptVendor/:vendorId").patch(adminHelpers.acceptVendor)

module.exports = router