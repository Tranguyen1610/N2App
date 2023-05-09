const express = require("express");
const { addRequest, allRequest, getRequestByTeacher, acceptRequest } = require("../controllers/requestControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/createRequest").post(protect, addRequest);
router.route("/").get(allRequest);
router.route("/getRequestByTeacher").get(protect, getRequestByTeacher);
router.route("/acceptRequest/:id").put(protect, acceptRequest);

module.exports = router;

