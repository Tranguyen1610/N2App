const express = require("express");
const {
  registerUser,
  allUsers,
  authUser,
  SearchUser,
  updateProfile,
  addWishList,
  getWishList,
  getinfo,
  addCart,
  onTeacher,
} = require("../controllers/userControllers");
const User = require('../models/userModel.js');
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");


router.post("/login", authUser);
router.route("/").post(registerUser);
router.route("/").get(protect,getinfo)
router.route("/getAll").get(protect, allUsers);
router.route("/update").put(protect, updateProfile);
router.get("/searchuser", SearchUser);
router.route("/getWishList").get(protect,getWishList);
router.route("/addWishList/:videoId").put(protect,addWishList);
router.route("/addCart/:courseId").put(protect,addCart);
router.route("/isTeacher").post(protect,onTeacher);

module.exports = router;
