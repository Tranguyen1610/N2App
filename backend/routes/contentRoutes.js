const express = require("express");
const { addContent, allContents } = require("../controllers/contentControllers");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/addcontent").post(protect, addContent);
router.route("/").get(allContents);

module.exports = router;

