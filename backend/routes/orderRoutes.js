const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getAllOrder, createOrder, deleteOrder, paymentSuccessOrder, getOrderSuccess, getOrderUnPaid, getOrderCancel, cancelOrder } = require("../controllers/orderControllers");

const router = express.Router();

router.route("/").get(protect,getAllOrder);
router.route("/getOrderSuccess").get(protect,getOrderSuccess);
router.route("/getOrderUnPaid").get(protect,getOrderUnPaid);
router.route("/getOrderCancel").get(protect,getOrderCancel);
router.route("/createOrder").post(protect,createOrder);
router.route("/:id/deleteOrder").delete(protect,deleteOrder);
router.route("/PaymentSuccessOrder/:id").put(protect,paymentSuccessOrder);
router.route("/cancelOrder/:id").put(protect,cancelOrder);

module.exports = router;
