const User = require("../models/UserModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ensures that JWT_SECRET is defined
// if (!process.env.JWT_SECRET) {
//     throw new Error("JWT_SECRET environment variable is not set.");
// }

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const signup = async (req, res) => {
    const { email, password } = req.body;

    // Check if password is provided
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user
        const user = new User({ email, password: hashedPassword });
        await user.save();
        
        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    signup,
    login,
};
