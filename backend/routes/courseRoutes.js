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
  sortCourse,
  getVideoOfCourse,
  getCourseofType,
  getInfoCourse,
  getCourseofTeacher,
  getCourseUnFinishOfTeacher,
  getCourseofTeacherNotSale,
  CheckCourse,
  allCoursesOnSale,
} = require("../controllers/courseControllers");
const router = express.Router();

router.route("/").get(allCourses);
router.route("/onSale").get(allCoursesOnSale);
router.route("/getInfoCourse/:id").get(protect,getInfoCourse);
router.route("/getVideoOfCourse/:CourseId").get(getVideoOfCourse);
// router.route("/getCourseUnFinished").get(protect, getCourseUnFinished);
router.route("/createCourse").post(protect, createCourse);
router.route("/addVideotoCourse").put(protect, addVideotoCourse);
router.route("/searchCourse").get(protect, searchCourse);
router.route("/:id/delete").post(protect, deleteCourse);
router.route("/update").put(protect, updateCoures);
router.route("/deleteVideo/:videoId").post(protect, deleteVideoOfCourse);
router.route("/sort").get(protect,sortCourse);
router.route("/:typeId/getcourseoftype").get(getCourseofType);
router.route("/getcourseofTeacher").get(protect,getCourseofTeacher);
router.route("/getCourseUnFinishOfTeacher").get(protect,getCourseUnFinishOfTeacher);
router.route("/getCourseofTeacherNotSale").get(protect,getCourseofTeacherNotSale);
router.route("/checkCourse/:id").put(protect,CheckCourse);
module.exports = router;
