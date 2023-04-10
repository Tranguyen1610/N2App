const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const createOrder = asyncHandler(async(req,res)=>{
    const {IsDeleted,PayMentStatus,PaymentType,MoneyTotal,Course,User}=req.body();
})
const getAllOrder = asyncHandler(async(req,res)=>{
    const keyword = req.query.search
    ? {
        $or: [
          { Name: { $regex: req.query.search, $options: "i" } },
          // { Email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log("abc");
  const orders = await Order.find(keyword);
  res.send(orders);
});
const deleteOrder = asyncHandler(async (req, res) => {
  // const findCourse = await Course.find(req.params.courseId)
  await Order.findByIdAndDelete(req.params.id).then((data) => {
    if (data) res.send(data);
    else res.send("error delete");
  });
})
module.exports={
    createOrder,
    getAllOrder,
    deleteOrder,
}