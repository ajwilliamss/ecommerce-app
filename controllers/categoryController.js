const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const Category = require("../models/categoryModel");

// @desc    Add category
// @route   POST /api/categories/add_category
// @access  Private
const addCategory = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { name } = req.body;

  // If required name field empty
  if (!name) {
    throw createError(400, "Please add category name");
  }

  // Find category using name
  const categoryExists = await Category.findOne({ name });

  // If category exists
  if (categoryExists) {
    throw createError(400, `Category with name: ${name} already exists`);
  }

  // Create category
  const category = await Category.create(req.body);

  // Respond with category
  res.status(201).json(category);
});

// @desc    Get categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  // Find categories
  const categories = await Category.find();

  // Respond with categories
  res.status(200).json(categories);
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { name } = req.body;

  // If required name field empty
  if (!name) {
    throw createError(400, "Please add category name");
  }

  // Find category using id params (:id)
  const category = await Category.findById(req.params.id);

  // If category does not exist
  if (!category) {
    throw createError(400, "Category does not exist");
  }

  // Update category
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  // Respond with updated category
  res.status(200).json(updatedCategory);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  // Find category using id params (:id)
  const category = await Category.findById(req.params.id);

  // If category does not exist
  if (!category) {
    throw createError(400, "Category does not exist");
  }

  // Delete category
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);

  // Respond with deleted category
  res.status(200).json(deletedCategory);
});

module.exports = { addCategory, getCategories, updateCategory, deleteCategory };
