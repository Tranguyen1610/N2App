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
    Type: { type:mongoose.Schema.Types.ObjectId, ref:"Type" },
    OriginPrice: { type: Number, trim: true },
    FinalPrice: { type: Number, trim: true },
    LastUpdate: { type: Date, trim: true },
    Image: {type: String, trim: true },
    Video: {type: String, trim: true },
    Comment:[
      {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Comment",
      }
    ]
  },
  {
    timestamp: true,
  }
  
);
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
