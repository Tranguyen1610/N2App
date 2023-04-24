const asyncHandler = require("express-async-handler");
const PaymentMethod = require("../models/paymentMethodModel");


const createPM = asyncHandler(async (req, res) => {
  try {
    const paymentMedthod = new PaymentMethod({
      Name: req.body.name,
      Logo: req.body.logo,
      Description: req.body.description,
    })
    const savePaymentMethod = await paymentMedthod.save();
    res.status(200).json(savePaymentMethod);
  } catch (err) {
    res.status(500).json(err);
  }

});

const getAll = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { Name: { $regex: req.query.search, $options: "i" } },
        // { Email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};
  const paymentMethods = await PaymentMethod.find(keyword);
  res.send(paymentMethods);
});
module.exports = { createPM, getAll }