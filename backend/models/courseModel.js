const mongoose = require("mongoose");
const courseSchema = mongoose.Schema(
  {
    Name: { type: String, trim: true },
    Teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ListVideo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    Description: { type: String, trim: true },
    Type: { type: String, trim: true },
    Price: { type: Number, trim: true },
    LastUpdate: { type: Date, trim: true },
  },
  {
    Timestamp: true,
  }
);
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;