const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

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
  try{
  const comment =await Comment.create({
    Sender: req.userId,
    Content: req.body.content,
    Course: req.body.courseId,
    NumberOfStarts:req.body.numberOfStarts,
  });
  console.log("Comment",comment);
  res.json(comment);
  if(req.body.courseId){
    const course = Course.findById(req.body.courseId);
    await course.updateOne({$push:{Comment:comment._id}})
  }
}catch(error){
  res.status(400).send(error.message || error);
}
   
    // .then((data) => {
    //   var result = data;
    //   //  res.json(result);
    // }).then((data)=>{
    //   console.log("data",data._id);
    //   const course = Course.findByIdAndUpdate(
    //     req.body.courseId,
    //     { $addToSet: { Comment: data._id } },
    //     { new: true }
    //   );
    //   res.json(course);
    // })
    // .catch((error) => {
    //  
    // }); 
    //  console.log("commentIDD",);
   
});
const getStartOfCourse=asyncHandler(async(req,res)=>{
  try{
    const startOfCourse = Course.findById(req.params.id)
    .populate("Comment")
    .then((data)=>
    {
      var r =data;
      res.json(r)
    }).
    then((data)=>{
      console.log("data",data);
    })
    // res.json(startOfCourse)
    // console.log("startOfCourse",startOfCourse);
  }catch(error){
    res.status(400).send(error.message || error);
  }
})
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
  getStartOfCourse,
};
