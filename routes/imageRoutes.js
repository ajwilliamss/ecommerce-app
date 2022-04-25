const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const { auth } = require("../middleware/authMiddleware");
const { adminAuth } = require("../middleware/adminMiddleware");
const { uploadImage, deleteImage } = require("../controllers/imageController");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to cloudinary
router.post("/upload", auth, adminAuth, uploadImage);
// Delete image from cloudinary
router.post("/delete_img", auth, adminAuth, deleteImage);

module.exports = router;
