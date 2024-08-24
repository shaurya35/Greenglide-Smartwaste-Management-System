const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());



// Log all requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const userAuthRoutes = require("./routes/userAuthRoutes.js");

// Base route
app.get("/", (req, res) => {
    res.json('/ route here');
  });

  app.use("/api/auth/user", userAuthRoutes);
  app.use("/api/auth/employee", userAuthRoutes);
  app.use("/api/auth/staff", userAuthRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and running on port http://localhost:${process.env.PORT}/`);
    });
  });