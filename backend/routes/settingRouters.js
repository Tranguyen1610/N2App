const express = require("express");
const { addSetting, allSettings, updateSetting, findByName } = require("../controllers/settingControllers");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(addSetting);
router.route("/").get(allSettings);
router.route("/").put(updateSetting);
router.route("/find/:name").get(findByName);

module.exports = router;

