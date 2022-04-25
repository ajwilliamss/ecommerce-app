const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const createError = require("http-errors");

const auth = asyncHandler(async (req, res, next) => {
  // JWT token
  let token;

  if (
    // HTTP Authorization request header
    req.headers.authorization &&
    // Bearer authentication
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Assign to req.user
      req.user = await User.findById(decoded.id).select("-password");

      // Pass control to the next middleware function
      next();
    } catch (error) {
      console.error(error);
      throw createError(401, "Authorization denied, invalid token");
    }
  }

  // If token not found
  if (!token) {
    throw createError(401, "Authorization denied, no token found");
  }
});

module.exports = { auth };
