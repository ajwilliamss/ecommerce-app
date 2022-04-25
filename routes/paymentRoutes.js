const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { adminAuth } = require("../middleware/adminMiddleware");
const {
  addPayment,
  getAllPayments,
} = require("../controllers/paymentController");

// Add payment
router.post("/add_payment", auth, addPayment);
// Get all payments
router.get("/", auth, adminAuth, getAllPayments);

module.exports = router;
