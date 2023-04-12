const asyncHandler = require("express-async-handler");
const Video = require("../models/videoModel");

const addVideo = asyncHandler(async (req, res) => {
  const { Name, LinkVideo, Description, CourseId } = req.body;

  if (!Name || !LinkVideo || !Description || !CourseId) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const video = await Video.create({
    Name,
    LinkVideo,
    Description,
    CourseId,
  });
  if (video) {
    res.status(200).json({
      _id: video._id,
      Name: video.Name,
      LinkVideo: video.LinkVideo,
      Description: video.Description,
      CourseId: video.CourseId,
    });
  } else {
    res.status(400);
    throw new Error("Video not found");
  }
});
const allVideos = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { Name: { $regex: req.query.search, $options: "i" } },
          // { Email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log("abc");
  const courses = await Video.find(keyword);
  res.send(courses);
});
const searchVideoById = asyncHandler(async (req, res) => {
  // const findCourse = await Course.find(req.params.courseId)
  const VideoId = req.params.id;
  const video = await Video.findById(VideoId);
  if (video) {
    res.json(video);
  }
  if (!video) {
    res.json("No search video");
  }
});
const deleteVideo = asyncHandler(async (req, res) => {
  Video.deleteOne({ id: req.params.videoId })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
});
module.exports = { addVideo, allVideos, searchVideoById, deleteVideo };
