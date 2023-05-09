const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async function (req, res) {
  const { Email, Password, Name, DateOfBirth } = req.body;
  if (!Name || !Email || !Password) {
    res.status(400).json({ success: false, message: "Please Enter all Feilds" })
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
    //pic,
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
        Id: user._id,
        token: generateToken(user._id),
        IsVerified: user.IsVerified,
      });
    } else {
      res.status(400)
        .json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
});

const authUserGoogle = asyncHandler(async (req, res) => {
  const { Email } = req.body;
  try {
    const user = await User.findOne({ Email })
    if (user) {
      res.json({
        success: true,
        message: 'Đăng nhập thành công',
        Id: user._id,
        token: generateToken(user._id),
        IsVerified: user.IsVerified,
      });
    } else {
      res.status(400)
        .json({ success: false, message: 'Tài khoản chưa đăng ký' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
});

const getInfo = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-Password')
      .populate("Cart").populate("WishList").populate("CoursePurchased").populate("FavoriteType")
    if (!user)
      return res.status(400).json({ success: false, message: 'User not found' })
    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { Email: { $regex: req.query.search, $options: "i" } },
        { Name: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};
  console.log("123", req.user);
  const users = await User.find(keyword).find({ _id: { $ne: req.userId } }).populate("CoursePurchased");
  res.send(users);
});
const SearchUser = asyncHandler(async (req, res) => {
  const { Name } = req.body;
  const user = await User.find({ Name }).select('-Password');
  if (user) {
    res.json(user);
  } else {
    res.json("Faild");
  }
});
const updateProfile = asyncHandler(async (req, res) => {
  const { Name } = req.body;

  const updateInfo = await User.findByIdAndUpdate(
    req.userId,
    {
      Name,
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
      Name: updateInfo.Name,
      Email: updateInfo.Email,
      token: generateToken(updateInfo._id),
    });
  }
});
const addWishList = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { $addToSet: { WishList: req.params.videoId } },
    { new: true }
  );
  // console.log(user);
  if (user) {
    res.json({
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      WishList: user.WishList,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
})

const deleteWishList = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { $pull: { WishList: req.params.videoId } },
    { new: true }
  );
  // console.log(user);
  if (user) {
    res.json({
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      WishList: user.WishList,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
})

const getWishList = asyncHandler(async (req, res) => {
  const course = await User.findById(req.userId).populate('WishList')
    .then((data) => { res.json(data.WishList) })
  // res.json(course.WishList)
})

const getCoursePurchased = asyncHandler(async (req, res) => {
  const course = await User.findById(req.userId).populate('CoursePurchased')
    .then((data) => { res.json(data.CoursePurchased) })
  // res.json(course.WishList)
})


const getAllCart = asyncHandler(async (req, res) => {
  const cart = await User.findById(req.userId).populate('Cart')
    .then((data) => { res.json(data.Cart) })
  // res.json(course.WishList)
})

const getFavoriteType = asyncHandler(async (req, res) => {
  const course = await User.findById(req.userId).populate('FavoriteType')
    .then((data) => { res.json(data.FavoriteType) })
  // res.json(course.WishList)
})

const addCart = asyncHandler(async (req, res) => {
  const { courseId } = req.params.courseId;

  const cart = await User.findByIdAndUpdate(
    req.userId,
    { $addToSet: { Cart: req.params.courseId } },
    { new: true }
  );
  console.log(courseId);
  // res.json(course);
  // console.log(course);
  // course.ListVideo.push({ ...videoId });
  // console.log("Course:", course.);
  if (cart) {
    res.json({
      _id: cart._id,
      Name: cart.Name,
      Email: cart.Email,
      DateOfBirth: cart.DateOfBirth,
      Cart: cart.Cart,

    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
})

const deleteCourseOfCard = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { $pull: { Cart: req.params.courseId } },
    { new: true }
  );
  // console.log(user);
  if (user) {
    res.json({
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      Cart: user.Cart,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
})
const deleteProductFromCart = asyncHandler(async (req, res) => {
  const cart = User.findById(req.userId);
  console.log(cart);
})
const onTeacher = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.userId,
    {
      $set: { IsTeacher: "TEACHER" },
    }, {
    new: true,
  }
  );
  // res.send(user);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  } else {
    res.json({
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      IsTeacher: user.IsTeacher,
      token: generateToken(user._id),
    });
  }

})

const updateFavoriteType = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { FavoriteType: req.body.types },
    { new: true }
  );
  // console.log(user);
  if (user) {
    res.json({
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      FavoriteType: user.FavoriteType,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
})

const changePassword = asyncHandler(async (req, res) => {
  const { PasswordOld, PasswordNew, Cfpassword } = req.body
  if (!PasswordOld || !PasswordNew || !Cfpassword)
    return res
      .status(400)
      .json({ success: false, message: 'Chưa nhập đủ dữ liệu' })
  try {
    const user = await User.findById(req.userId)
    const passwordValid = await user.matchPassword(PasswordOld)
    if (!passwordValid) {
      return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng' });
    }

    if (PasswordNew === Cfpassword) {
      const salt = await bcrypt.genSalt(10); //10 rounds
      const Pw = await bcrypt.hash(PasswordNew, salt);
      await User.findByIdAndUpdate(req.userId, {
        $set: { "Password": Pw }
      }
        , { new: true })
      res.json({ success: true, message: 'Đổi mật khẩu thành công' })
    }
    else {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới nhập lại không đúng' });
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = {
  registerUser,
  authUser,
  authUserGoogle,
  allUsers,
  SearchUser,
  updateProfile,
  addWishList,
  getWishList,
  getInfo,
  addCart,
  getAllCart,
  deleteProductFromCart,
  onTeacher,
  deleteWishList,
  deleteCourseOfCard,
  getCoursePurchased,
  getFavoriteType,
  updateFavoriteType,
  changePassword,
};
