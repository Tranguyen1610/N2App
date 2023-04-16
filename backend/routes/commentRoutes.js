const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const {
  getAllComments,
  createComment,
  deleteComment,
  getStartOfCourse,
} = require("../controllers/commentControllers");

const router = express.Router();

router.route("/:courseId").get(protect, getAllComments);
router.route("/").post(protect, createComment);
router.route("/:commentId/delete").delete(protect, deleteComment);
router.route("/:id/star").get(protect, getStartOfCourse);

module.exports = router;
