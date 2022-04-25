const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const Product = require("../models/productModel");

// @desc    Create product
// @route   POST /api/products/create
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { name, price, description, image, category } = req.body;

  // If a required field is empty
  if (!name || !price || !description || !image || !category) {
    throw createError(400, "Please add required fields");
  }

  // Find product using name
  const productExists = await Product.findOne({ name });

  // If product exists
  if (productExists) {
    throw createError(400, `Product with name: ${name} already exists`);
  }

  // Create product
  const product = await Product.create(req.body);

  // Respond with product
  res.status(201).json(product);
});

// @desc    Get products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // Find all products
  const products = await Product.find();

  // If products not found
  if (!products) {
    throw createError(400, "No products found");
  }

  // Respond with products
  res.status(200).json(products);
});

// @desc    Get product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  // Find product using id params (:id)
  const product = await Product.findById(req.params.id);

  // If product not found
  if (!product) {
    throw createError(400, "Product not found");
  }

  // Respond with product
  res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { name, price, description, image, category } = req.body;

  // If a required field is empty
  if (!name || !price || !description || !image || !category) {
    throw createError(400, "Please add required fields");
  }

  // Find product using id params (:id)
  const product = await Product.findById(req.params.id);

  // If product not found
  if (!product) {
    throw createError(400, "Product not found");
  }

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // Respond with updated product
  res.status(200).json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  // Find product using id params (:id)
  const product = await Product.findById(req.params.id);

  // If product not found
  if (!product) {
    throw createError(400, "Product not found");
  }

  // Update product
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  // Respond with deleted product
  res.status(200).json(deletedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
