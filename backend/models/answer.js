// backend/models/answer.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  answerText: { type: String, required: true },
  // question: { type: Schema.Types.ObjectId, required: true },
  // questionUrl: { type: String },
  answeredBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [{ type: String, default: "" }],
  share: { type: String, default: "public" },
});

const Answersend = mongoose.model("Answers", answerSchema);

module.exports = Answersend;
