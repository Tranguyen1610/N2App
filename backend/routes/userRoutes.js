const express = require("express");
const {
  registerUser,
  allUsers,
  authUser,
  SearchUser,
  updateProfile,
} = require("../controllers/userControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/update").put(protect, updateProfile);
router.get("/searchuser", SearchUser);

module.exports = router;
