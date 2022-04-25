const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const User = require("../models/userModel");

const adminAuth = asyncHandler(async (req, res, next) => {
  // Find logged in user
  const user = await User.findById(req.user.id).select("-password");

  // If user is not admin
  if (user.role !== "admin") {
    throw createError(401, "Only admin users have access to this resource");
  }
  // Pass control to the next middleware function
  next();
});

module.exports = { adminAuth };
