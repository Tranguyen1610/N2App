const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");
const Course = require("../models/courseModel");
const User = require("../models/userModel");
const { use } = require("../routes/requestRoutes");

const addRequest = asyncHandler(async (req, res) => {
  const { Course, Content } = req.body;

  if (!Content) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const request = await Request.create({
    Sender: req.userId,
    Course: req.body.Course,
    Content: req.body.Content,
    Amount : req.body.Amount,
  });
  if (request) {

    res.status(200).json({
      _id: request._id,
      Course: request.Course,
      Content: request.Content,
      Amount :request.Amount,
    });
  } else {
    res.status(400);
    throw new Error("Request not found");
  }
});

const allRequest = asyncHandler(async (req, res) => {
  await Request.find().populate("Sender").populate("Course").populate("Content").sort({ createdAt: 'desc' })
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
});

const getRequestByTeacher = asyncHandler(async (req, res) => {
  await Request.find({ Sender: req.userId }).populate("Sender").populate("Course").populate("Content").sort({ createdAt: 'desc' })
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})

const getRequestByTeacherAccept = asyncHandler(async (req, res) => {
  await Request.find({ Sender: req.userId, Status:true })
  .populate("Sender").populate("Course").populate("Content").sort({ createdAt: 'desc' })
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})

const getRequestByTeacherNoAccept = asyncHandler(async (req, res) => {
  await Request.find({ Sender: req.userId,Status:false })
  .populate("Sender").populate("Course").populate("Content").sort({ createdAt: 'desc' })
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
})

const acceptRequest = asyncHandler(async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { Status: true ,
        Result:1},
      { new: true }).populate("Sender").populate("Content").populate("Course")
      console.log("request",request);
    if (request) {
      if (request.Content.Key === "buycourse") {
        const course = await Course.findByIdAndUpdate(
          request.Course._id,
          {
            $set:{OnSale: true},
          },
          { new: true }
        );
      }
      if (request.Content.Key === "withdrawmoney"){
        const user=await User.findById(request.Sender._id);
        const afterBalance = Number(user.Balance) - Number(request.Amount);
        await User.findByIdAndUpdate(request.Sender._id,{$set:{Balance:afterBalance}},{new:true})
      }
      res.status(200).json(request);
    }
    else {
      return res.status(404).send('Request not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

const denyRequest = asyncHandler(async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { Status: true ,
        Result:0,
        Note:req.body.Note},
      { new: true }).populate("Sender").populate("Content").populate("Course")
      console.log("request",request);
    if (request) {
      res.status(200).json(request);
    }
    else {
      return res.status(404).send('Request not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = {
  addRequest,
  allRequest,
  getRequestByTeacher,
  acceptRequest,
  denyRequest,
  getRequestByTeacherAccept,
  getRequestByTeacherNoAccept,
}