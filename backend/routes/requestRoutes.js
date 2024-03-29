const express = require("express");
const { addRequest, allRequest, getRequestByTeacher, acceptRequest, denyRequest, getRequestByTeacherAccept, getRequestByTeacherNoAccept, cancelRequest, getRequestByTeacherCancel } = require("../controllers/requestControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/createRequest").post(protect, addRequest);
router.route("/").get(allRequest);
router.route("/getRequestByTeacher").get(protect, getRequestByTeacher);
router.route("/getRequestByTeacherAccept").get(protect, getRequestByTeacherAccept);
router.route("/getRequestByTeacherNoAccept").get(protect, getRequestByTeacherNoAccept);
router.route("/getRequestByTeacherCancel").get(protect, getRequestByTeacherCancel);
router.route("/acceptRequest/:id").put(protect, acceptRequest);
router.route("/denyRequest/:id").put(protect, denyRequest);
router.route("/cancelRequest/:id").put(protect,cancelRequest);

module.exports = router;

