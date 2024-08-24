const User = require("../models/EmployeeModel.js");
const jwt = require("jsonwebtoken");

// ensures that JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set.");
}

const login = async (req, res) => {
    const { employeecode } = req.body;  // Changed to employee code
    try {
        const user = await User.findOne({ employeecode });
        if (!user) {
            return res.status(400).json({ error: 'Invalid employee code' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    login,
};
