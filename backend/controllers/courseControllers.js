const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

const createCourse = asyncHandler(async (req, res) => {
  const { Name, Description, Type, Price, Image } = req.body;

  if (!Name || !Description || !Type || !Price) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const course = await Course.create({
    Name,
    Description,
    Type,
    Price,
  });
  if (course) {
    res.status(201).json({
      _id: course._id,
      Name: course.Name,
      Description: course.Description,
      Type: course.Type,
      Price: course.Price,
    });
  } else {
    res.status(400);
    throw new Error("Course not found");
  }
});
const addVideotoCourse = asyncHandler(async (req, res) => {
  const { videoId } = req.body;

  const course = await Course.findByIdAndUpdate(
    req.body.courseId,
    { $addToSet: { ListVideo: videoId } },
    { new: true }
  );
  console.log(course);
  // res.json(course);
  // console.log(course);
  // course.ListVideo.push({ ...videoId });
  // console.log("Course:", course.);
  if (course) {
    res.json({
      _id: course._id,
      Name: course.Name,
      Description: course.Description,
      Type: course.Type,
      Price: course.Price,
      ListVideo: course.ListVideo,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const searchCourse = asyncHandler(async (req, res) => {
  const { Name } = req.body;
  const course = await Course.find({ Name });
  if (course) {
    res.json(course);
  } else {
    res.json("Faild");
  }
});
const allCourses = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { Name: { $regex: req.query.search, $options: "i" } },
          { Type: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log("abc");
  const courses = await Course.find(keyword);
  res.send(courses);
});
const deleteCourse = asyncHandler(async (req, res) => {
  // const findCourse = await Course.find(req.params.courseId)
  await Course.findByIdAndDelete(req.params.id).then((data) => {
    if (data) res.send(data);
    else res.send("error delete");
  });
});
const updateCoures = asyncHandler(async (req, res) => {
  const { Name, Description, Type, Price, _id } = req.body;
  const course = await Course.findByIdAndUpdate(
    _id,
    {
      Name,
      Description,
      Type,
      Price,
    },
    { new: true }
  );
  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  } else {
    res.json({
      _id: course._id,
      Name: course.Name,
      Description: course.Description,
      Type: course.Type,
      Price: course.Price,
    });
  }
});
const deleteVideoOfCourse = asyncHandler(async (req, res) => {
  await Course.findById({
    VideoId: [req.params.videoId],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
const sortCourse = asyncHandler(async(req,res)=>{
  const course = await Course.find({}).sort({FinalPrice:-1})
  res.send(course);
})
module.exports = {
  createCourse,
  addVideotoCourse,
  searchCourse,
  allCourses,
  deleteCourse,
  deleteVideoOfCourse,
  updateCoures,
  sortCourse,
};
