
const express = require("express");
const router = express.Router();

const { login } = require("../controllers/employeeAuthController.js");

// Login route
router.post("/login", login);

module.exports = router;