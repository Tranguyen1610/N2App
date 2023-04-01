const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const { sendMessage } = require("../controllers/messageControllers");
const {
  getAllComments,
  createComment,
  deleteComment,
} = require("../controllers/commentControllers");

const router = express.Router();

router.route("/:courseId").get(protect, getAllComments);
router.route("/").post(protect, createComment);
router.route("/:commentId/delete").delete(protect, deleteComment);

module.exports = router;
