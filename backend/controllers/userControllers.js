const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async function (req, res) {
  const { Email, Password, UserName, Name, DateOfBirth } = req.body;
  if (!Name || !Email || !Password) {
    res.status(400);
    throw new Error("Please Enter all Feilds");
  }
  const userExists = await User.findOne({ Email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    Name,
    UserName,
    Email,
    Password,
    DateOfBirth,
    // Cart,
    // WishList,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      Name: user.Name,
      UserName: user.UserName,
      Email: user.Email,
      Password: user.Password,
      DateOfBirth: user.DateOfBirth,
      // Cart: user.Cart,
      // WishList: user.WishList,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Failed to create the user ");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  const user = await User.findOne({ Email });

  if (user && (await user.matchPassword(Password))) {
    res.json({
      Id: user._id,
      Name: user.Name,
      Email: user.Email,
      UserName: user.UserName,
      DateOfBirth: user.DateOfBirth,
      // Cart: user.Cart,
      // WishList: user.WishList,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
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
