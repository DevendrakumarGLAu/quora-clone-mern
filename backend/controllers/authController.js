// backend/controllers/authController.js

const bcrypt = require('bcrypt');
const User = require('../models/user');

async function signup(req, res) {
    try {
        const {
          username,
          password,
          Qualifications,
          Working,
          Email,
          mobile,
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username,
          password: hashedPassword,
          Qualifications,
          Working,
          Email,
          mobile,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
              message: "Login successful",
              user: {
                username: user.username,
                email: user.Email, // Assuming 'Email' is the property name in your User model
                qualifications: user.Qualifications,
                Working: user.Working,
                mobile: user.mobile,
              },
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { signup, login };
