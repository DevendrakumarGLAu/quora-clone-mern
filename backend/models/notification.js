// backend/models/notification.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['answer', 'post', 'question', 'space'], required: true },
  objectId: { type: Schema.Types.ObjectId, required: true }, // ID of the related object (answer, post, question, space)
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
