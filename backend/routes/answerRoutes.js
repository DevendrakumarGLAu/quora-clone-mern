// backend/routes/answerRoutes.js
const express = require("express");
const router = express.Router();
const Answer = require("../models/answer");
const Question = require("../models/question");
const mongoose = require("mongoose");


// router.post("/answer-question/:questionId", async (req, res) => {
//   try {
//     const { questionId } = req.params;
//     const { answerText } = req.body;
//     const {answeredBy} = req.body;
//     console.log("Request Body:", req.body);
//     // const { answerText, answeredBy } = req.body;
//     // console.log("Answer Text:", answerText);
//     // console.log("Answered By:", answeredBy);
//     const question = await Question.findById(questionId);
//     if (!question) {
//       return res.status(404).json({ error: "Question not found" });
//     }
//    const newAnswer = new Answer({
//      answerText,
//      question: question._id,
//      answeredBy,
//    });
//     await newAnswer.save();
//     question.answers.push(newAnswer); // Update to push the entire newAnswer object
//     await question.save();
//     res.status(200).json({ message: "Answer submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting answer:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.post("/answer-question/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const { answerText, answeredBy, commentText, voteType } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const newAnswer = new Answer({
      answerText,
      question: question._id,
      answeredBy,
    });
    // Handle comments, upvotes, and downvotes
    if (commentText) {
      newAnswer.comments.push({ text: commentText });
    }
    if (voteType === "upvote") {
      newAnswer.upvotes += 1;
    } else if (voteType === "downvote") {
      newAnswer.downvotes += 1;
    }
    await newAnswer.save();
    question.answers.push(newAnswer);
    await question.save();
    res.status(200).json({ message: "Answer submitted successfully" });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/AnswerActionCommentVotes/:answerId", async (req, res) => {
  try {
    const { answerId } = req.params;
    const { action, commentText, shareType } = req.body;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    switch (action) {
      case "comment":
        answer.comments.push({ text: commentText });
        break;
      case "upvote":
        answer.upvotes += 1;
        break;
      case "downvote":
        answer.downvotes += 1;
        break;
      case "share":
        answer.share = shareType;
        break;
      default:
        return res.status(400).json({ error: "Invalid action specified" });
    }
    await answer.save();
    res.status(200).json({ message: `${action} added successfully` });
  } catch (error) {
    console.error(`Error adding ${action}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/GetQuestionWithAnswer/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    // console.log("Received questionId:", questionId);
    const questionWithAnswer = await Question.findOne({
      _id: questionId,
    }).populate("answers");

    if (!questionWithAnswer) {
      return res
        .status(404)
        .json({ error: `Question with ID '${questionId}' not found` });
    }
    res.json(questionWithAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
