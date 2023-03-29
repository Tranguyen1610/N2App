const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createCourse,
  addVideotoCourse,
  searchCourse,
  allCourses,
  deleteCourse,
} = require("../controllers/courseControllers");
const router = express.Router();

router.route("/").get(protect, allCourses);
router.route("/createCourse").post(protect, createCourse);
router.route("/addVideotoCourse").put(protect, addVideotoCourse);
router.route("/searchCourse").get(protect, searchCourse);
router.route("/:id/delete").post(protect, deleteCourse);

module.exports = router;
