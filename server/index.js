const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const StaffRoutes = require("./routes/staffRoutes");
// Get access to the video, canvas, capture button, and download link elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const downloadLink = document.getElementById('download');
let latitude = null;
let longitude = null;


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

// Prompt user for permission to access the camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Error accessing the camera: ", err);
  });

// Get the user's location
navigator.geolocation.getCurrentPosition(
  position => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  },
  error => {
    console.error("Error getting location: ", error);
  }
);

// Capture the photo and overlay location and date/time
captureButton.addEventListener('click', () => {
  if (latitude !== null && longitude !== null) {
    // Draw the current frame from the video onto the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString(); // Format: MM/DD/YYYY
    const time = now.toLocaleTimeString(); // Format: HH:MM:SS AM/PM

    // Overlay the location on the image
    context.font = "20px Arial";
    context.fillStyle = "red";
    context.fillText(`Lat: ${latitude}, Long: ${longitude}, 10, canvas.height - 50`);

    // Overlay the date and time on the imagea
    context.fillText(`Date: ${date}, Time: ${time}, 10, canvas.height - 20`);

    // Convert the canvas image to a data URL
    const imageDataUrl = canvas.toDataURL('image/png');

    // Set the download link href to the image data URL
    downloadLink.href = imageDataUrl;

    // Automatically trigger the download
    downloadLink.click();
  } else {
    console.error("Location not available yet.");
  }
});


mongoose.connect("mongodb://localhost:27017/dustbinAttendance");

app.listen(3000, () => {
  console.log(`Server is running at port : 3000`);
});
