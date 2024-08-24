const Attendance = require("../models/AttendanceModel.js")

const markAttendance = async (req, res) => {
    const { dustbinId, workerId } = req.body;

    if (!dustbinId || !workerId) {
        return res.status(400).send('Dustbin ID and Worker ID are required');
    }

    const currentDate = new Date();
    const istDate = new Date(currentDate.getTime() + (5.5 * 60 * 60 * 1000));
    const dateStr = istDate.toISOString().split('T')[0];
    const currentTime = istDate;

    try {
        let attendance = await Attendance.findOne({
            workerId,
            date: dateStr
        });

        if (attendance) {
            if (!attendance.dustbinId.includes(dustbinId)) {
                attendance.dustbinId.push(dustbinId);
                attendance.timestamps.push(currentTime);
                await attendance.save();
                res.status(200).send('Attendance updated successfully');
            } else {
                res.status(200).send('Dustbin already scanned today');
            }
        } else {
            const newAttendance = new Attendance({
                dustbinId: [dustbinId],
                workerId,
                date: dateStr,
                timestamps: [currentTime]
            });
            await newAttendance.save();
            res.status(200).send('Attendance marked successfully');
        }
    } catch (error) {
        res.status(500).send('Error marking attendance');
    }
};

module.exports = { markAttendance };