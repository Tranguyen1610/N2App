const asyncHandler = require("express-async-handler");
const OTP = require("../models/otpModel");
const User = require("../models/userModel");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD_APP
  }
});

const sendOTP = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const email = user.Email;
    const otp = Math.floor(Math.random() * 9000 + 1000) + "";

    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: 'Xác thực tài khoản N2App',
      html: '<h4> Chào '+user.Name+' </h4></p><h3>Mã xác thực tài khoản của bạn là: ' + otp + '. Mã có giá trị trong 5 phút.</h3><p>Vì lý do bảo mật vui lòng không cung cấp mã xác thực cho bất cứ ai.</p>'
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        return res.status(400).json({ success: false, message: error });
      } else {
        const salt = await bcrypt.genSalt(10); //10 rounds
        const hashedOtp = await bcrypt.hash(otp, salt);
        const newOtp = new OTP({ email, otp: hashedOtp })
        await OTP.findOneAndDelete({ Email: email })
        newOtp.save();
        res.json({ success: true, message: 'Gửi mã OTP thành công' })
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

const verifyOTP = asyncHandler(async (req, res) => {
  const { Otp } = req.body
  try {
    const user = await User.findById(req.userId);
    const email = user.Email;

    const getotp = await OTP.findOne({ Email: email })
    if (!getotp) {
      return res
        // .status(400)
        .json({ success: false, message: 'OTP hết hạn' })
    }
    const otpValid = bcrypt.compareSync(Otp,getotp.otp);
      if (!otpValid)
      return res
        // .status(400)
        .json({ success: false, message: 'OTP không chính xác' })

    await User.findByIdAndUpdate(req.userId, {
      IsVerified: true
    }
      , { new: true })
    await OTP.findOneAndDelete({ Email: email })
    res.json({ success: true, message: 'Xác thực tài khoản thành công' })
  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})


module.exports = {
  sendOTP,
  verifyOTP
}