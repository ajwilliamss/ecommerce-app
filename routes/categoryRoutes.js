const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { adminAuth } = require("../middleware/adminMiddleware");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Add category
router.post("/add_category", auth, adminAuth, addCategory);
// Get categories
router.get("/", getCategories);
// Update category
router.put("/:id", auth, adminAuth, updateCategory);
// Delete category
router.delete("/:id", auth, adminAuth, deleteCategory);

module.exports = router;
