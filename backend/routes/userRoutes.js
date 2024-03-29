const express = require("express");
const {
  registerUser,
  allUsers,
  authUser,
  SearchUser,
  updateProfile,
  addWishList,
  getWishList,
  getInfo,
  addCart,
  onTeacher,
  deleteWishList,
  deleteCourseOfCard,
  getAllCart,
  getCoursePurchased,
  getFavoriteType,
  updateFavoriteType,
  changePassword,
  authUserGoogle,
  getAmount,
  getHistoryMCA,
  getBankAccount,
  updateBankAccount,
} = require("../controllers/userControllers");
const User = require('../models/userModel.js');
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");


router.post("/login", authUser);
router.post("/loginGoogle", authUserGoogle);
router.route("/").post(registerUser);
router.route("/").get(protect,getInfo);
router.route("/getAll").get(protect, allUsers);
router.route("/update").put(protect, updateProfile);
router.get("/searchuser", SearchUser);
router.route("/getWishList").get(protect,getWishList);
router.route("/getCoursePurchased").get(protect,getCoursePurchased);
router.route("/addWishList/:videoId").put(protect,addWishList);
router.route("/deleteWishList/:videoId").put(protect,deleteWishList);
router.route("/addCart/:courseId").put(protect,addCart);
router.route("/deleteCart/:courseId").put(protect,deleteCourseOfCard);
router.route("/isTeacher").post(protect,onTeacher);
router.route("/getCart").get(protect,getAllCart);
router.route("/getFavoriteType").get(protect,getFavoriteType);
router.route("/updateFavoriteType").put(protect,updateFavoriteType);
router.route("/changePassword").put(protect,changePassword);
router.route("/amount").get(protect,getAmount);
router.route("/historyMCA").get(protect,getHistoryMCA);
router.route("/bankAccount/:id").get(getBankAccount);
router.route("/updateBankAccount").put(protect,updateBankAccount);
module.exports = router;
