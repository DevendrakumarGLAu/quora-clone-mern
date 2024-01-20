// backend/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  Qualifications: { type: String, required: true },
  Working: { type: String, required: true },
  Email: { type: String, required: true },
  mobile: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

module.exports = User;

