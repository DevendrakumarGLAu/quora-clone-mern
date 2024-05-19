// backend/routes/notification.js

const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const { userId, type, objectId } = req.body;
    const notification = new Notification({ userId, type, objectId });
    await notification.save();
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get notifications for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Mark a notification as read
router.put('/:notificationId', async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
