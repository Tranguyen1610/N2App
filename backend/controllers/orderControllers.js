const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const OrderDetail = require("../models/orderDetailModel");
const { count } = require("../models/orderModel");

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
    const orderf = await Order.findById(saveOrder._id).populate('BuyerId').populate('Detail').populate('PayMentType');
    if (saveOrder) {
      try {
        saveOrder.Detail.forEach(async (o) => {
          await User.findByIdAndUpdate(
            saveOrder.BuyerId,
            {
              $pull: { Cart: o, WishList: o },
            },
            { new: true }
          );
        });
        res.status(200).json(orderf);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(404).send('Order not found');
    }

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
      { new: true }).populate('BuyerId').populate('Detail').populate('PayMentType');
    if (order) {
      order.Detail.forEach(async (o) => {
        await User.findByIdAndUpdate(
          order.BuyerId,
          {
            $addToSet: { CoursePurchased: o },
          },
          { new: true }
        );
      });
      for (const d of order.Detail) {
        const user = await User.findById(d.Teacher);
        const amount = d.Price - (d.Price * 10) / 100;
        const afterBalance = Number(user.Balance) + Number(amount);
        await User.findByIdAndUpdate(d.Teacher, { $set: { Balance: afterBalance } });
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
  const orders = await Order.find(keyword).populate('BuyerId').populate('Detail').populate('PayMentType');
  res.send(orders);
});

const getAllOrderSuccess = asyncHandler(async (req, res) => {
  await Order.find({ IsPayment: { $eq: true } })
  .populate("Detail")
  .sort({ createdAt: 'desc' })
  .select('Detail updatedAt -_id')
  .then((data) => {
    let list=[];
    var result = data;
    data.forEach((order)=>{
      const time = order.updatedAt;
      order.Detail.forEach(detail=>{
        list.push({course:detail, date:time})
      })
    }
    )
    res.json(list);
  })
  .catch((error) => {
    res.status(400).send(error.message || error);
  });
});

const getOrderSuccess = asyncHandler(async (req, res) => {
  await Order.find({ BuyerId: { $eq: req.userId }, IsPayment: { $eq: true } })
    .populate('Detail')
    .populate('BuyerId')
    .populate('PayMentType')
    .sort({ createdAt: 'desc' })
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
});

const getOrderUnPaid = asyncHandler(async (req, res) => {
  await Order.find({ BuyerId: { $eq: req.userId }, IsPayment: { $eq: false }, IsCancel: { $ne: true } })
    .populate('BuyerId')
    .populate('Detail')
    .populate('PayMentType')
    .sort({ createdAt: 'desc' })
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
});

const getOrderCancel = asyncHandler(async (req, res) => {
  await Order.find({ BuyerId: { $eq: req.userId }, IsCancel: { $eq: true } })
    .populate('BuyerId')
    .populate('Detail')
    .populate('PayMentType')
    .sort({ createdAt: 'desc' })
    .then((data) => {
      var result = data;
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send(error.message || error);
    });
});

const deleteOrder = asyncHandler(async (req, res) => {
  // const findCourse = await Course.find(req.params.courseId)
  await Order.findByIdAndDelete(req.params.id).then((data) => {
    if (data) res.send(data);
    else res.send("error delete");
  });
})

const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { IsCancel: true },
      { new: true });
    if (order) {
      res.status(200).json(order);
    }
    else {
      return res.status(404).send('Order not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = {
  createOrder,
  getAllOrder,
  deleteOrder,
  paymentSuccessOrder,
  getOrderSuccess,
  getOrderUnPaid,
  getOrderCancel,
  cancelOrder,
  getAllOrderSuccess,
}