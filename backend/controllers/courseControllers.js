const { json } = require("express");
const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

const createCourse = asyncHandler(async (req, res) => {
  const { Name, Description, Type, Price, Image, Video } = req.body;

  if (!Name || !Description || !Type || !Price || !Image || !Video) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  const course = await Course.create({
    Name,
    Description,
    Type,
    Price,
    Image,
    Video,
    Teacher: req.userId,
  });
  if (course) {

    res.status(201).json({
      _id: course._id,
      Name: course.Name,
      Description: course.Description,
      Type: course.Type,
      Price: course.Price,
      Image: course.Image,
      Video: course.Video,
      Teacher: course.Teacher,
    });
    const user = User.findById(req.userId);
    await user.updateOne({ $push: { CoursePosted: course._id } })
  } else {
    res.status(400);
    throw new Error("Course not found");
  }
});
const addVideotoCourse = asyncHandler(async (req, res) => {
  const { VideoId, CourseId } = req.body;

  const course = await Course.findByIdAndUpdate(
    CourseId,
    { $addToSet: { ListVideo: VideoId } },
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
    throw new Error("Course not found");
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
  const courses = await Course.find(keyword)
    .populate("Teacher", "-Password")
    .populate("Type")
    .populate("ListVideo")
    .populate("Comment");
  res.send(courses);
});

const allCoursesOnSale = asyncHandler(async (req, res) => {
  await Course.find({ OnSale: true })
    .populate("Teacher", "-Password")
    .populate("Type")
    .populate("ListVideo")
    .populate("Comment")
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})

const getInfoCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("Type").populate("ListVideo").populate("Teacher")
    if (!course)
      return res.status(400).json('Course not found')
    res.json(course)
  } catch (error) {
    console.log(error)
    res.status(500).json('Internal server error')
  }
})

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
const sortCourse = asyncHandler(async (req, res) => {
  const course = await Course.find({}).sort({ FinalPrice: -1 })
  res.send(course);
})
const getVideoOfCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.CourseId).populate('ListVideo');
  if (course) {
    res.json({
      ListVideo: course.ListVideo
    })
  }
  else {
    res.status(400);
    throw new Error("Course not found");
  }
})
const getCourseofType = asyncHandler(async (req, res) => {
  await Course.find({ Type: req.params.typeId, OnSale: true }).populate("Type")
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})

const getCourseofTeacher = asyncHandler(async (req, res) => {
  await Course.find({ Teacher: req.userId, ListVideo: { $ne: [], $exists: true }, OnSale: true, IsDelete: false }).populate("Teacher").populate("Type")
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})

const getCourseofTeacherNotSale = asyncHandler(async (req, res) => {
  await Course.find({ Teacher: req.userId, ListVideo: { $ne: [], $exists: true }, OnSale: false, IsDelete: false }).populate("Teacher").populate("Type")
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})

const getCourseUnFinishOfTeacher = asyncHandler(async (req, res) => {
  await Course.find({ Teacher: req.userId, ListVideo: { $size: 0 }, IsDelete: false }).populate("Teacher").populate("Type")
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})
const CheckCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id,
    {
      OnSale: true
    },
    {
      new: true,
    })
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
      isCheck: course.isCheck,
    });
  }
})

const getCourseofTeacherSort = asyncHandler(async (req, res) => {
  await Course.find({ Teacher: req.userId, ListVideo: { $ne: [], $exists: true }, IsDelete: false, OnSale: true })
    .populate("Teacher")
    .populate("Type")
    .sort({ NumSale: 'desc' })
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})

const deleteCourseAdmin = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: { OnSale: false, IsDelete: true },
      },
      { new: true }
    );
    if (course) {
      res.json(course);
    }
    else {
      res.status(400);
      throw new Error("Course not found");
    }
  }
  catch{ (error) => {
    res.status(400).send(error);
  }};
})

module.exports = {
  createCourse,
  addVideotoCourse,
  searchCourse,
  allCourses,
  deleteCourse,
  deleteCourseAdmin,
  deleteVideoOfCourse,
  updateCoures,
  sortCourse,
  getVideoOfCourse,
  getCourseofType,
  getInfoCourse,
  getCourseofTeacher,
  getCourseUnFinishOfTeacher,
  getCourseofTeacherNotSale,
  CheckCourse,
  allCoursesOnSale,
  getCourseofTeacherSort
};
