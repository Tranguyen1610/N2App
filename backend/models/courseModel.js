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
    Price: { type: Number, trim: true },
    LastUpdate: { type: Date, trim: true },
    Image: {type: String, trim: true },
    Video: {type: String, trim: true },
    Comment:[
      {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Comment",
      }
    ],
    OnSale:{type:Boolean,default:false},
    IsDelete:{type:Boolean,default:false},
    NumSale:{ type: Number, trim: true, default:0 },
  },
  {
    timestamp: true,
  }
  
);
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
