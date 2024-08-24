const express = require("express");
const router = express.Router();

const {
    markAttendance
} = require("../controllers/employeeControllers");

router.post("/",markAttendance);

module.exports = router;