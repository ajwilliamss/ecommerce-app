const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { adminAuth } = require("../middleware/adminMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Create product
router.post("/create", auth, adminAuth, createProduct);
// Get products
router.get("/", getProducts);
// Get product
router.get("/:id", getProduct);
// Update product
router.put("/:id", auth, adminAuth, updateProduct);
// Delete product
router.delete("/:id", auth, adminAuth, deleteProduct);

module.exports = router;
