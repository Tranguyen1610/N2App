const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const OrderDetail = require("../models/orderDetailModel");

const createOrder = asyncHandler(async (req, res) => {
  try {
    // const orderDetailIds = Promise.all(req.body.Detail.map(async(detail)=>{
    //   let newOrderDetail = new OrderDetail({
    //     CourseId:detail.CourseId
    //   })

    //   newOrderDetail = await newOrderDetail.save();

    //   return newOrderDetail._id;
    // }))
    // const orderDetailIdsResolved = await orderDetailIds
    // console.log("orderDetailId",orderDetailIdsResolved);
    let order = new Order({
      // Detail:orderDetailIdsResolved,
      Detail: req.body.Detail,
      PayMentType: req.body.PayMentType,
      MoneyTotal: req.body.MoneyTotal,
      MoneyFinal: req.body.MoneyFinal,
      BuyerId: req.userId,
    });
    const saveOrder = await order.save();
    res.status(200).json(saveOrder);
    // res.send(order)
  } catch (err) {
    res.status(500).json(err);
  }
})

const paymentSuccessOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { IsPayment: true },
      { new: true });
    if (order) {
      try {
        order.Detail.forEach(async (o) => {
          await User.findByIdAndUpdate(
            order.BuyerId,
            {
              $addToSet: { CoursePurchased: o },
              $pull: { Cart:o,WishList: o },
            },
              { new: true }
          );
        });
      } catch (err) {
        res.status(500).json(err);
      }
      res.status(200).json(order);
    }
    else {
      return res.status(404).send('Order not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

const getAllOrder = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { Name: { $regex: req.query.search, $options: "i" } },
        // { Email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};
  const orders = await Order.find(keyword).populate('BuyerId');
  res.send(orders);
});
const deleteOrder = asyncHandler(async (req, res) => {
  // const findCourse = await Course.find(req.params.courseId)
  await Order.findByIdAndDelete(req.params.id).then((data) => {
    if (data) res.send(data);
    else res.send("error delete");
  });
})
module.exports = {
  createOrder,
  getAllOrder,
  deleteOrder,
  paymentSuccessOrder,
}