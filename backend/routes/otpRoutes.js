const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/otpControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/sendOTP").post(protect,sendOTP);
router.route("/verifyOTP").put(protect,verifyOTP);

module.exports = router;