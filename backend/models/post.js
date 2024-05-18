// models/post.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema({
  type: { type: String, enum: ["content"], required: true }, 
  content: { type: String, required: true },
  username: { type: String, required: true }, 
  Working: { type: String },
  image: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
