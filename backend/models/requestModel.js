const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    Sender: { type: mongoose.Types.ObjectId, ref: "User" },
    Course: { type: mongoose.Types.ObjectId, ref: "Course" },
    Content: { type: mongoose.Types.ObjectId, ref: "Content" },
    Status: {type:Boolean, default:false},
  },
  { timestamps: true }
);
const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
