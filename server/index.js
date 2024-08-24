const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/dustbinAttendance', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const StaffRoutes = require("./routes/staffRoutes");

app.use("/api/staff/:staffId/dashboard", StaffRoutes);

app.listen(port, () => {
    console.log(`Server is running at port : ${port}`);
});

