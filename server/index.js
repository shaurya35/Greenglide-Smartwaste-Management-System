const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");
app.use(express.json());
app.use(cors());

// Log all requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const userAuthRoutes = require("./routes/userAuthRoutes.js");

// Base route
app.get("/", (req, res) => {
  res.json("/ route here");
});

app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/employee", userAuthRoutes);
app.use("/api/auth/staff", userAuthRoutes);

mongoose.connect("mongodb://localhost:27017/dustbinAttendance");

const StaffRoutes = require("./routes/staffRoutes");

app.use("/api/staff/:staffId/dashboard", StaffRoutes);

app.listen(3000, () => {
  console.log(`Server is running at port : 3000`);
});
