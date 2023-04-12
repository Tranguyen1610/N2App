const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createCourse,
  addVideotoCourse,
  searchCourse,
  allCourses,
  deleteCourse,
  updateCoures,
  deleteVideoOfCourse,
} = require("../controllers/courseControllers");
const router = express.Router();

router.route("/").get(protect, allCourses);
router.route("/getCourseUnFinished").get(protect, getCourseUnFinished);
router.route("/createCourse").post(protect, createCourse);
router.route("/addVideotoCourse").put(protect, addVideotoCourse);
router.route("/searchCourse").get(protect, searchCourse);
router.route("/:id/delete").post(protect, deleteCourse);
router.route("/update").put(protect, updateCoures);
router.route("/deleteVideo/:videoId").post(protect, deleteVideoOfCourse);

module.exports = router;
