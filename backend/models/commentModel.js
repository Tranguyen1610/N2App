const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    Sender: { type: mongoose.Types.ObjectId, ref: "User" },
    Course: { type: mongoose.Types.ObjectId, ref: "Course" },
    Content: { type: String, trim: true },
    NumberOfStarts: { type: Number },
    ReplyId: { type: mongoose.Types.ObjectId, ref: "Comment" },
    LastUpdate: { type: Date, trim: true },
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
