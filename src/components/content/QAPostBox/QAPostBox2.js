import React, { useEffect, useState } from "react";
import "./QAPostBox.css";

function QAPostBox() {
  const [questions, setQuestions] = useState([]);
  const [questionsQA, setQuestionsQA] = useState([]);

  const fetchQuestions = async () => {
    try {
      // const response = await fetch(
      //   "http://localhost:3001/api/questions/get-questions"
      // );

      const response = await fetch(
        "http://localhost:3001/api/questions/GetQuestionIds"
      );

      if (response.ok) {
        const data = await response.json();
        const questionsArray = Array.isArray(data) ? data : [data];
        console.log("Questions Array:", questionsArray);

        setQuestions(questionsArray);
        const questionIds = questionsArray.map(
          (question) => question.questionId
        );
        console.log("Question IDs:", questionIds);
      } else {
        console.error("Error fetching questions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  const getQuestionWithAnswer = async (questionId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/answers/GetQuestionWithAnswer/${questionId}`
      );
      if (response.ok) {
        const questionWithAnswers = await response.json();
        console.log("Question with Answers:", questionWithAnswers);
        console.log(
          "Question with Answers in Array :",
          questionWithAnswers.answers
        );
        console.log(
          "length of answer array",
          questionWithAnswers.answers.length
        );

        const questionIdToCheck = questionWithAnswers._id;
        console.log("Question ID to check:", questionIdToCheck);
        if (questionWithAnswers.answers.length > 0) {
          setQuestionsQA((prevQuestions) => [
            ...prevQuestions,
            questionWithAnswers,
          ]);
        }
      } else {
        console.error(
          "Error fetching question with answer:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching question with answer:", error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    questions.forEach((question) => {
      const questionId = question.questionId;
      getQuestionWithAnswer(questionId);
    });
  }, [questions]);

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleString("en-Uk", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="">
      {questionsQA.map((questionaa, index) => (
        <div key={index} className="question-container">
          <div className="question-details">
            <div class="d-flex flex-row mb-3">
              <div class="p-2">
                <h3 className="card-title">{questionaa.questionName}</h3>
              </div>
              <div class="p-2">
                <p className="card-text">
                  {formatDateString(questionaa.createdAt)}
                </p>
              </div>
            </div>
            {questionaa.answers.map((answer) => (
              <div key={answer._id} className=" answer-container">
                <div class="d-flex flex-row mb-3">
                  <div class="p-2">
                    <p className="card-text">
                      <small className="text-muted">
                        Answered by: {answer.answeredBy}
                      </small>
                    </p>
                  </div>
                  <div class="p-2">
                    <p className="card-text">
                      <small className="text-muted">
                        Created at: {formatDateString(answer.createdAt)}
                      </small>
                    </p>
                  </div>
                </div>
                <div class="d-flex flex-column mb-3">
                  <div class="p-2">
                    {" "}
                    <p className="card-text">{answer.answerText}</p>
                  </div>
                </div>

                <div class="d-flex flex-row mb-1 ">
                  <div class="p-2 border-upvotes">
                    <p className="card-text">
                      <i class="fa-regular fa-circle-up"></i>Upvotes.
                      {answer.upvotes}
                    </p>
                  </div>
                  <div class="p-2 downvotes">
                    <p className="card-text">
                      <i class="fa-regular fa-circle-down"></i>
                      {answer.downvotes}
                    </p>
                  </div>
                  <div class="p-2">
                    <p className="card-text">
                      <i class="fa-regular fa-comment"></i>
                      {answer.comments}
                    </p>
                  </div>
                  <div class="p-2">
                    <p className="card-text">
                      <i class="fa-regular fa-share-from-square"></i>
                      {answer.share}
                    </p>
                  </div>
                  <div class="p-2">
                    <p className="card-text">
                      <small className="text-muted">
                        Last updated: {formatDateString(answer.updatedAt)}
                      </small>
                    </p>
                  </div>
                </div>

                <hr />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QAPostBox;
