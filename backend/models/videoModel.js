const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    CourseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    Name: { type: String, trim: true },
    LinkVideo: { type: String, default: "" },
    Description: { type: String, trim: true },
  },
  {
    Timestamp: true,
  }
);
const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
