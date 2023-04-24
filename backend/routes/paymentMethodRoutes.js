const express = require("express");
const { createPM, getAll } = require("../controllers/paymentMethodControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createPM);
router.route("/").get(protect, getAll);

module.exports = router;

