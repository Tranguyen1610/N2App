const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const {
  getAllComments,
  createComment,
  deleteComment,
  getStartOfCourse,
  replyComment,
  getReplyofComment,
} = require("../controllers/commentControllers");

const router = express.Router();

router.route("/:courseId").get(protect, getAllComments);
router.route("/").post(protect, createComment);
router.route("/:commentId/delete").delete(protect, deleteComment);
router.route("/:id/star").get(protect, getStartOfCourse);
router.route("/reply").post(protect,replyComment);
router.route("/:replyId/getreply").get(protect,getReplyofComment);

module.exports = router;
