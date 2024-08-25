const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const StaffRoutes = require("./routes/staffRoutes");

const cors = require("cors");
app.use(express.json());
app.use(cors());

// Log all requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const userAuthRoutes = require("./routes/userAuthRoutes.js");
const EmployeeRoutes = require("./routes/employeeRoutes.js");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "uploads",
  allowedFormats: ["jpg", "png"],
});

const upload = multer({ storage });

// Base route
app.get("/", (req, res) => {
  res.json("/ route here");
});

app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/employee", userAuthRoutes);
app.use("/api/auth/staff", userAuthRoutes);
app.use("/api/emp/:empId/dashboard", EmployeeRoutes);
app.use("/api/staff/:staffId/dashboard", StaffRoutes);

app.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = req.file.path; // Cloudinary URL of the uploaded image
  res.redirect("/display?image=${imageUrl}");
});

// Display uploaded image
app.get("/display", (req, res) => {
  const imageUrl = req.query.image;
  res.render("display", { imageUrl });
});

mongoose.connect("mongodb://localhost:27017/dustbinAttendance");

app.listen(3000, () => {
  console.log(`Server is running at port : 3000`);
});
