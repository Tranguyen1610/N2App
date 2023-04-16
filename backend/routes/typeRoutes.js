const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { addType, allTypes } = require("../controllers/typeControllers");
const router = express.Router();

router.route("/addType").post(protect, addType);
router.route("/").get(allTypes);

module.exports = router;

