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
    Type: { type:String, trim: true, ref:"Type" },
    OriginPrice: { type: Number, trim: true },
    FinalPrice: { type: Number, trim: true },
    LastUpdate: { type: Date, trim: true },
    Comment:[
      {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Comment",
      }
    ]
  },
  {
    Timestamp: true,
  }
  
);
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
