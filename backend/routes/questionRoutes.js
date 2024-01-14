// backend/routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const Answer = require("../models/answer");

router.post("/submit-question", async (req, res) => {
  try {
    const { questionName, questionUrl } = req.body;
    // const user = await User.findById(askedBy);
    const newQuestion = new Question({
      questionName,
      questionUrl,
    //   askedBy: user,
    });
    await newQuestion.save();
    res.status(200).json({ message: "Question submitted successfully" });
  } catch (error) {
    console.error("Error submitting question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/get-questions", async (req, res) => {
  try {
    const questions = await Question.find();

    const formattedQuestions = questions.map((question) => {
      // console.log("Question ID:", question._id);
      return {
        questionId: question._id.toString(),
        questionName: question.questionName,
        questionUrl: question.questionUrl,
        createdAt: question.createdAt,
        answers: question.answers.map((answer) => ({
          answerText: answer.answerText,
          answeredBy: answer.answeredBy,
          createdAt: answer.createdAt,
        })),
      };
    });

    res.status(200).json(formattedQuestions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  // router.post("/answer-question/:questionId", async (req, res) => {
  //   try {
  //     const { questionId } = req.params;
  //     const { answerText } = req.body;

  //     const question = await Question.findById(questionId);
  //     if (!question) {
  //       return res.status(404).json({ error: "Question not found" });
  //     }

  //     const newAnswer = new Answer({
  //       answerText,
  //       question: question && question._id,
  //       answeredBy: req.user && req.user._id, // Assuming you have user authentication middleware
  //     });

  //     await newAnswer.save();
  //     question.answers.push(newAnswer._id);
  //     await question.save();

  //     res.status(200).json({ message: "Answer submitted successfully" });
  //   } catch (error) {
  //     console.error("Error submitting answer:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

module.exports = router;
