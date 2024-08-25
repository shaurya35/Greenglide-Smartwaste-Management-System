const express = require("express");
const router = express.Router();

router.post("/uploads",upload.single("[image]"));

module.exports = router;