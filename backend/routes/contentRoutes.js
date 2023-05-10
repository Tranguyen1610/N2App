const express = require("express");
const { addContent, allContents, keyForContentId } = require("../controllers/contentControllers");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/addcontent").post(protect, addContent);
router.route("/").get(allContents);
router.route("/getKey/:id").get(protect, keyForContentId);

module.exports = router;

