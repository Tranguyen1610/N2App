const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { addType } = require("../controllers/typeControllers");
const router = express.Router();

router.route("/addType").post(protect, addType);

module.exports = router;

