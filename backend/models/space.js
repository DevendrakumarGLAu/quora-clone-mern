// backend/models/space.js

const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures the name is unique
  },
  description: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
});

const Space = mongoose.model("Space", spaceSchema);

module.exports = Space;
