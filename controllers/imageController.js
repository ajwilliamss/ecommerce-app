const cloudinary = require("cloudinary");
const fs = require("fs");

// @desc    Upload image
// @route   POST /api/images/upload
// @access  Private
const uploadImage = (req, res) => {
  try {
    // If there are no images
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400);
      throw new Error("No images uploaded");
    }

    // Store image in variable
    const file = req.files.file;

    // If image format is incorrect
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      // Remove temporary file from tmp folder
      removeTempFile(file.tempFilePath);
      res.status(400);
      throw new Error("Image is not in correct format");
    }

    // If image is too large
    if (file.size > 1024 * 1024) {
      // Remove temporary file from tmp folder
      removeTempFile(file.tempFilePath);
      res.status(400);
      throw new Error("Size of image too large");
    }

    // Upload image
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "ecommerce" },
      async (err, result) => {
        if (err) throw err;

        // Remove temporary file from tmp folder
        removeTempFile(file.tempFilePath);

        // Respond with id and url
        res
          .status(200)
          .json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete image
// @route   DELETE /api/images/delete_img
// @access  Private
const deleteImage = (req, res) => {
  try {
    // Destructure req.body
    const { public_id } = req.body;

    // If there is no id
    if (!public_id) {
      res.status(400);
      throw new Error("Please add image id");
    }

    // Delete file
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      // Respond with success message
      res.status(200).json({ message: "Image deleted" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Remove temporary file from tmp folder
const removeTempFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = { uploadImage, deleteImage };
