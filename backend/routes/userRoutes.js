const express = require("express");
const {
  registerUser,
  allUsers,
  authUser,
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

router.post("/login", authUser);


module.exports = router;
