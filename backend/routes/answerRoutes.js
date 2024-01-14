// backend/routes/answerRoutes.js
const express = require("express");
const router = express.Router();
const Answer = require("../models/answer");
const Question = require("../models/question");


router.post("/answer-question/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const { answerText } = req.body;
    const {answeredBy} = req.body;
    console.log("Request Body:", req.body);

    // const { answerText, answeredBy } = req.body;
    console.log("Answer Text:", answerText);
    console.log("Answered By:", answeredBy);


    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

   const newAnswer = new Answer({
     answerText,
     question: question._id,
     answeredBy,
   });

    await newAnswer.save();
    question.answers.push(newAnswer); // Update to push the entire newAnswer object
    await question.save();

    res.status(200).json({ message: "Answer submitted successfully" });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
