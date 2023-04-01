const express = require("express");
const {
  registerUser,
  allUsers,
  authUser,
  SearchUser,
  updateProfile,
} = require("../controllers/userControllers");
const User = require('../models/userModel.js');
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(registerUser);

router.get('/', protect, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-Password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
});

router.route("/").get(protect, allUsers);
router.post("/login", authUser);
router.route("/update").put(protect, updateProfile);
router.get("/searchuser", SearchUser);


module.exports = router;
