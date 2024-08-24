const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    dustbinId: [String], 
    workerId: String,
    date: { type: String, required: true },  
    timestamps: [Date]
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;