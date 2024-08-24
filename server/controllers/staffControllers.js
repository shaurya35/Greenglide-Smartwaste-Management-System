const Staff = require("../models/StaffModel.js");
const Attendance = require("../models/AttendanceModel.js")
const Dustbin = require('../models/DustbinModel.js'); 

const getEmployeeInfo = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().split('T')[0];
        const attendances = await Attendance.find({ date: currentDate });

        const employeeInfo = attendances.map(attendance => [
            attendance.workerId,
            attendance.dustbinId.length
        ]); 

        res.status(200).json(employeeInfo);
    } catch (error) {
        console.error('Error fetching employee info:', error);
        res.status(500).json({ error: 'An error occurred while fetching employee information.' });
    }
};

const getTotalEmployeeInfo = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().split('T')[0];

        const attendances = await Attendance.find({ date: currentDate });

        let totalDustbinCount = 0;
        attendances.forEach(attendance => {
            totalDustbinCount += attendance.dustbinId.length;
        });

        res.status(200).json({ totalDustbinCount });
    } catch (error) {
        console.error('Error fetching total employee data:', error);
        res.status(500).json({ error: 'An error occurred while fetching total employee data.' });
    }
};

const getMap = async (req, res) => {
    try {
        const dustbins = await Dustbin.find();
        res.json(dustbins);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dustbins data' });
    }
};

module.exports = { 
    getEmployeeInfo,
    getTotalEmployeeInfo,
    getMap
 };



