const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
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
} = require("../controllers/userController");

// Register user
router.post("/register", registerUser);
// Login user
router.post("/login", loginUser);
// Get user
router.get("/user", auth, getUser);
// Update user
router.put("/:id", auth, updateUser);
// Delete user
router.delete("/:id", auth, deleteUser);
// Update user cart
router.patch("/update_cart", auth, updateCart);
// Get user cart
router.get("/get_cart", auth, getCart);
// Remove cart item
router.delete("/remove_item/:id", auth, removeCartItem);
// Clear user cart
router.get("/clear_cart", auth, resetCart);
// Get user payment history
router.get("/payment_history", auth, getPaymentHistory);

module.exports = router;
