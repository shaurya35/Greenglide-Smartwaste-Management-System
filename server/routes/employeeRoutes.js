const express = require("express");
const router = express.Router();

const {
    markAttendance
} = require("../controllers/employeeController");

router.post("/",markAttendance);

module.exports = router;