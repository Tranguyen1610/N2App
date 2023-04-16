const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const OrderDetail = require("../models/orderDetailModel");

const createOrder = asyncHandler(async(req,res)=>{
    try{
    const orderDetailIds = Promise.all(req.body.Detail.map(async(detail)=>{
      let newOrderDetail = new OrderDetail({
        CourseId:detail.CourseId
      })

      newOrderDetail = await newOrderDetail.save();

      return newOrderDetail._id;
    }))
    const orderDetailIdsResolved = await orderDetailIds
    console.log("orderDetailId",orderDetailIdsResolved);
    let order = new Order({
      Detail:orderDetailIdsResolved,
      PayMentType:req.body.PayMentType,
      MoneyTotal:req.body.MoneyTotal,
      MoneyFinal:req.body.MoneyFinal,
      User:req.body.User,
    });
     const saveOrder =await order.save();
     res.status(200).json(saveOrder);
    res.send(order)
    }catch(err){
    res.status(500).json(err);
    }
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