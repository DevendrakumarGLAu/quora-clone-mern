// models/post.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  type: { type: String, enum: ["content"], required: true }, // Updated type to "content"
  content: { type: String, required: true },
  username: { type: String, required: true }, // Added username field
  experience: { type: String }, // Added experience field
  image: { type: String }, // Assuming you store the image URL, you can modify it based on your needs
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
