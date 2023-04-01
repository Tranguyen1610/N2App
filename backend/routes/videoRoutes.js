const express = require("express");
const {
  addVideo,
  allVideos,
  searchVideoById,
  deleteVideo,
} = require("../controllers/videoControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allVideos);
router.route("/addvideo").post(protect, addVideo);
router.route("/:id/id").get(protect, searchVideoById);
router.route("/:videoId/delete").delete(protect, deleteVideo);

module.exports = router;
