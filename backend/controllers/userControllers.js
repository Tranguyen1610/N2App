const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async function (req, res) {
  const { Email, Password, UserName, Name, DateOfBirth, pic } = req.body;
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
    pic,
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
      pic: user.pic,
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
      pic: user.pic,
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
          { Name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log("123", req.user);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
const SearchUser = asyncHandler(async (req, res) => {
  const { Name } = req.body;
  const user = await User.find({ Name });
  if (user) {
    res.json(user);
  } else {
    res.json("Faild");
  }
});
const updateProfile = asyncHandler(async (req, res) => {
  const { _id, UserName, Name, pic } = req.body;

  const updateInfo = await User.findByIdAndUpdate(
    _id,
    {
      UserName,
      Name,
      pic,
    },
    {
      new: true,
    }
  );

  if (!updateInfo) {
    res.status(400);
    throw new Error("User not found");
  } else {
    res.json({
      _id: updateInfo._id,
      UserName: updateInfo.UserName,
      Name: updateInfo.Name,
      Email: updateInfo.Email,
      pic: updateInfo.pic,
      token: generateToken(updateInfo._id),
    });
  }
});
module.exports = {
  registerUser,
  authUser,
  allUsers,
  SearchUser,
  updateProfile,
};
