const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user');

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
        console.log('Received signup request');

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
            console.log(req.session);
            req.session.username = user.username;
            req.session.Email = user.email;
            req.session.Qualifications = user.qualifications;
            req.session.mobile= user.mobile;
            req.session.Working = user.Working;
            res.status(200).json({ message: 'Login successful'})
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);
module.exports = router;
