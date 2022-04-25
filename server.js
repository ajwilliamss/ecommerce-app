require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

// Create express application
const app = express();

// Connect to MongoDB
connectDB();

// Invoke middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

// Serve client if production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) =>
    res.send("Please set node environment to production")
  );
}

// Invoke error handler middleware
app.use(errorHandler);

// Start server on port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
