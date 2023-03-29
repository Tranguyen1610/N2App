const asyncHandler = require("express-async-handler");
const Video = require("../models/videoModel");

const addVideo = asyncHandler(async (req, res) => {
  const { Name, LinkVideo, Description } = req.body;

  if (!Name || !LinkVideo || !Description) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const video = Video.create({
    Name,
    LinkVideo,
    Description,
  });
  if (video) {
    res.status(200).json({
      _id: video._id,
      Name: video.Name,
      LinkVideo: video.LinkVideo,
      Description: video.Description,
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
module.exports = { addVideo, allVideos, searchVideoById };
