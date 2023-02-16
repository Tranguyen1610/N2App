const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async function (req, res) {
  const { Email, Password, Name, DateOfBirth } = req.body;
  if (!Name || !Email || !Password) {
    res.status(400).json({ success: false, message:"Please Enter all Feilds"})
  }
  const userExists = await User.findOne({ Email });
  if (userExists) {
    res.status(400).json({ success: false, message: 'Email đã tồn tại' });
  }
  const user = await User.create({
    Name,
    Email,
    Password,
    DateOfBirth,
    // Cart,
    // WishList,
  });
  if (user) {
    res.status(201).json({ success: true, message: 'Tạo tài khoản thành công', token: generateToken(user._id) })
  } else {
    throw new Error("Failed to create the user ");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email })
    if (user && (await user.matchPassword(Password))) {
      res.json({
        success: true,
        message: 'Đăng nhập thành công',
        token: generateToken(user._id),
      });
    } else {
      res.status(400)
        .json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
});
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { UserName: { $regex: req.query.search, $options: "i" } },
        { Email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = { registerUser, authUser, allUsers };
