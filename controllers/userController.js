const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Payment = require("../models/paymentModel");
const Product = require("../models/productModel");

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { name, email, password } = req.body;

  // If a required field is empty
  if (!name || !email || !password) {
    throw createError(400, "Please add required fields");
  }

  // Find user using email
  const userExists = await User.findOne({ email });

  // If user exists
  if (userExists) {
    throw createError(400, `User with email: ${email} already exists`);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate token
  const token = generateToken(newUser._id);

  // Respond with token
  res.status(201).json({ token });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { email, password } = req.body;

  // If a required field is empty
  if (!email || !password) {
    throw createError(400, "Please add required fields");
  }

  // Find user using email
  const user = await User.findOne({ email });

  // If user does not exist
  if (!user) {
    throw createError(400, `User with email: ${email} does not exist`);
  }

  // Check that passwords match
  const isMatch = await bcrypt.compare(password, user.password);

  // If passwords do not match
  if (!isMatch) {
    res.status(401);
    throw createError(401, "Incorrect password");
  }

  // Generate token
  const token = generateToken(user._id);

  // Respond with token
  res.status(200).json({ token });
});

// @desc    Get user
// @route   GET /api/users/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  // Find logged in user
  const user = await User.findById(req.user.id).select("-password");

  // If user does not exist
  if (!user) {
    throw createError(400, "User does not exist");
  }

  // Respond with user
  res.status(200).json(user);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { name, email, password } = req.body;

  // If a required field is empty
  if (!name || !email || !password) {
    throw createError(400, "To update please add required fields");
  }

  // Find user using id params (:id)
  const user = await User.findById(req.params.id);

  // If user does not exist
  if (!user) {
    throw createError(400, "User does not exist");
  }

  // If user that is logged in does not match user to be updated
  if (req.user.id !== req.params.id) {
    throw createError(401, "You are not authorized to update this account");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body, password: hashedPassword },
    { new: true }
  );

  // Respond with updated user
  res.status(200).json({
    _id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  // Find user using id params (:id)
  const user = await User.findById(req.params.id);

  // If user does not exist
  if (!user) {
    throw createError(400, "User does not exist");
  }

  // If user that is logged in does not match user to be deleted
  if (req.user.id !== req.params.id) {
    throw createError(401, "You are not authorized to delete this account");
  }

  // Delete user
  await User.findByIdAndDelete(req.params.id);

  // Respond with success message
  res.status(200).json({ message: "User deleted" });
});

// @desc    Update user cart
// @route   PATCH /api/users/update_cart
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
  // Find logged in user using id
  const user = await User.findById(req.user.id);

  // If user does not exist
  if (!user) {
    throw createError(400, "User does not exist");
  }

  // Update cart
  await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { cart: req.body.cart } },
    { new: true }
  );

  // Respond with updated cart
  res.status(200).json(user.cart);
});

// @desc    Get user cart
// @route   GET /api/users/get_cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  // Find user
  const user = await User.findById(req.user.id);

  // If user does not exist
  if (!user) {
    throw createError(400, "User does not exist");
  }

  // Respond with user cart
  res.status(200).json(user.cart);
});

// @desc    Remove cart item
// @route   DELETE /api/users/remove_item/:id
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
  // Find product using id
  const product = await Product.findById(req.params.id);

  // If product does not exist
  if (!product) {
    throw createError(400, "Product does not exist");
  }

  // Find user
  const user = await User.findById(req.user.id);

  // If user does not exist
  if (!user) {
    throw createError(400, "User does not exist");
  }

  // Remove cart item from cart array
  user.cart = user.cart.filter((item) => item._id !== product._id.toString());
  await user.save();

  // Respond with success message
  res.status(200).json({ message: "Item removed from cart" });
});

// @desc    Reset user cart
// @route   GET /api/users/clear_cart
// @access  Private
const resetCart = asyncHandler(async (req, res) => {
  // Find logged in user using id
  const user = await User.findById(req.user.id);

  // If user does not exist
  if (!user) {
    throw createError(400, "User does not exist");
  }

  // Clear cart
  await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: { cart: [] },
    },
    { new: true }
  );

  // Respond with success message
  res.status(200).json({ message: "Cart has been reset" });
});

// @desc    Get user payment history
// @route   GET /api/users/payment_history
// @access  Private
const getPaymentHistory = asyncHandler(async (req, res) => {
  // Find logged in user payments
  const payments = await Payment.find({ user: req.user.id });

  // If payments not found
  if (!payments) {
    throw createError(400, "No payment history to display");
  }

  // Respond with payment history
  res.status(200).json(payments);
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  updateCart,
  getCart,
  removeCartItem,
  resetCart,
  getPaymentHistory,
};
