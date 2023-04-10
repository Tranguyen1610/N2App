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
    //pic,
    // Cart,
    // WishList,
  });
  if (user) {
    res.status(201).json({ success: true, message: 'Tạo tài khoản thành công' ,token: generateToken(user._id) })
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
      });
    } else {
      res.status(400)
        .json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
});

const getinfo = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-Password')
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
  const users = await User.find(keyword).find({ _id: { $ne: req.userId } });
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
  const { _id, Name } = req.body;

  const updateInfo = await User.findByIdAndUpdate(
    _id,
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
const addWishList = asyncHandler(async(req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { WishList:req.params.videoId } },
    { new: true }
  );
  console.log(user);
  // res.json(course);
  // console.log(course);
  // course.ListVideo.push({ ...videoId });
  // console.log("Course:", course.);
  if (user) {
    res.json({
      _id: user._id,
      Name: user.Name,
      Email:user.Email,
      WishList: user.WishList,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
})
const getWishList = asyncHandler(async(req,res)=>{
  const course =await User.findById(req.userId).then((data)=>{res.json(data.WishList)})
  // res.json(course.WishList)
})

const getAllCart = asyncHandler(async(req,res)=>{
  const cart =await User.findById(req.userId).then((data)=>{res.json(data.Cart)})
  // res.json(course.WishList)
})
const addCart =asyncHandler(async(req,res)=>{
  const { courseId } = req.params.courseId;

  const cart = await User.findByIdAndUpdate(
    req.userId,
    { $addToSet: {Cart :req.params.courseId } },
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
      Email:cart.Email,
      DateOfBirth:cart.DateOfBirth,
      Cart:cart.Cart,

    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
})
const deleteProductFromCart = asyncHandler(async(req,res)=>{
  const cart = User.findById(req.userId);
  console.log(cart);
})
const onTeacher = asyncHandler(async(req,res)=>{
  const user =await User.findByIdAndUpdate(req.userId,
    {
     $set:{IsTeacher:"TEACHER"},
    },{
      new:true,
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
        IsTeacher:user.IsTeacher,
        token: generateToken(user._id),
      });
    }

})
module.exports = {
  registerUser,
  authUser,
  allUsers,
  SearchUser,
  updateProfile,
  addWishList,
  getWishList,
  getinfo,
  addCart,
  getAllCart,
  deleteProductFromCart,
  onTeacher,
};
