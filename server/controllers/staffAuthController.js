const Staff = require("../models/StaffModel.js");
const jwt = require('jsonwebtoken');

// ensures that JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set.");
}

const login = async (req, res) => {
    const { staffcode } = req.body;  // Modified to use staffcode
    try {
        const staff = await Staff.findOne({ staffcode });
        if (!staff) {
            return res.status(400).json({ error: 'Invalid staff code' });
        }

        const token = jwt.sign({ _id: staff._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    login,
};
