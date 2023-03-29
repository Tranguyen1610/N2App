const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "User" },
    CourseId: { type: mongoose.Types.ObjectId, ref: "Course" },
    Content: { type: String, trim: true },
    NumberOfStarts: { type: Number },
    Comment: { type: String, trim: true, require: true },
    ReplyId: { type: mongoose.Types.ObjectId, ref: "Comment" },
    LastUpdate: { type: Date, trim: true },
  },
  {
    Timestamp: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
