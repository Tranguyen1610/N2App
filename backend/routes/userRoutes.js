const express = require("express");
const {
  registerUser,
  allUsers,
  authUser,
  SearchUser,
  updateProfile,
  addWishList,
  getWishList,
  addCart,
} = require("../controllers/userControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/update").put(protect, updateProfile);
router.get("/searchuser", SearchUser);
router.route("/getWishList").get(protect,getWishList);
router.route("/addWishList/:videoId").put(protect,addWishList);
router.route("/addCart/:courseId").put(protect,addCart);

module.exports = router;
