// models/post.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema({
  type: { type: String, enum: ["content"], required: true }, // Updated type to "content"
  content: { type: String, required: true },
  username: { type: String, required: true }, // Added username field
  Working: { type: String }, // Added Working field
  image: { type: String }, // Assuming you store the image URL, you can modify it based on your needs
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
