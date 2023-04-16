const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getAllOrder, createOrder, deleteOrder } = require("../controllers/orderControllers");

const router = express.Router();

router.route("/").get(protect,getAllOrder);
router.route("/createOrder").post(protect,createOrder);
router.route("/:id/deleteOrder").delete(protect,deleteOrder);

module.exports = router;
