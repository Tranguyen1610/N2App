const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { PayMent } = require("../controllers/stripeControllers");

const router = express.Router();

router.route("/pay").post(protect,PayMent);

module.exports = router;
