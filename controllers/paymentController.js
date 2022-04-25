const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");

// @desc    Add payment
// @route   POST /api/payments/add_payment
// @access  Private
const addPayment = asyncHandler(async (req, res) => {
  // Find logged in user name and email
  const user = await User.findById(req.user.id).select("name email");

  // If user does not exist
  if (!user) {
    throw createError(400, `User does not exist`);
  }

  // Destructure user
  const { _id, name, email } = user;

  // Destructure req.body
  const { transactionId, address, cart } = req.body;

  // If required field is empty
  if (!transactionId || !address || !cart) {
    throw createError(400, "Please add required fields");
  }

  // Create payment
  const payment = await Payment.create({
    ...req.body,
    user: _id,
    name,
    email,
  });

  // Respond with payment
  res.status(201).json(payment);
});

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
const getAllPayments = asyncHandler(async (req, res) => {
  // Find all payments
  const payments = await Payment.find();

  // If no payments found
  if (!payments) {
    throw createError(400, "No payments found");
  }

  // Respond with payments
  res.status(200).json(payments);
});

module.exports = { addPayment, getAllPayments };
