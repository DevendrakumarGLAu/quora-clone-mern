const express = require('express');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post(
    '/signup',
    [
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
        body('Qualifications').isLength({ min: 3 }).withMessage('Qualifications must be at least 3 characters'),
        body('Working').isLength({ min: 3 }).withMessage('Working must be at least 3 characters'),
        body('Email').isEmail().withMessage('Please enter a valid email address'),
        body('mobile').isMobilePhone().withMessage('Please enter a valid mobile number'),
    ],
    async (req, res) => {
        // console.log('Received signup request');

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // const { Email, password,mobile } = req.body;
            const {
                username,
                password,
                Qualifications,
                Working,
                Email,
                mobile,
            } = req.body;
            const existingEmail = await User.findOne({ Email });
            const existingMobile = await User.findOne({ mobile });
            const lowercaseUsername = username.toLowerCase();
            const userInDb = await User.findOne({ username: { $regex: new RegExp(`^${lowercaseUsername}$`, 'i') } });
            if (userInDb) {
                return res.status(400).json({ error: "Username already exists" });
            }
            if (existingEmail) {
                return res.status(400).json({ error: "Email already exists" });
            }
            if (existingMobile) {
                return res.status(400).json({ error: "Mobile number already exists" });
            }
            const newUser = new User({ username, password, Qualifications, Working, Email, mobile });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);
const jwtSecret = 'DevendraKumarSinghGlau';
router.use(session({
    secret: jwtSecret, // Change this to your actual secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 // 1 hour (in milliseconds)
    }
}));
router.post(
    '/login',
    [
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
            if (password !== user.password) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
            const token = jwt.sign(
                { username: user.username, email: user.email },
                jwtSecret,
                { expiresIn: '3600000' }
            );
            // Return token along with other user details
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);
module.exports = router;

module.exports = router;
