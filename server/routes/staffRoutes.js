const express = require("express");
const router = express.Router();

const {
    getEmployeeInfo,
    getTotalEmployeeInfo,
    getMap
} = require("../controllers/staffControllers");

router.get("/",getEmployeeInfo);
router.get("/total",getTotalEmployeeInfo)
router.get("/map",getMap)

module.exports = router;