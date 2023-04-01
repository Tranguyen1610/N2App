const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");

const getAllComments = asyncHandler(async (req, res) => {
  await Comment.find({ Course: req.params.courseId })
    .populate("Sender", "-Password")
    .populate("Course")
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
});

const createComment = asyncHandler(async (req, res) => {
  Comment.create({
    Sender: req.user._id,
    Content: req.body.content,
    Course: req.body.courseId,
  })
    .populate("Sender", "-Password")
    .populate("Course")
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
});

const deleteComment = asyncHandler(async (req, res) => {
  Comment.deleteOne({ id: req.params.commentId })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = {
  getAllComments,
  createComment,
  deleteComment,
};
