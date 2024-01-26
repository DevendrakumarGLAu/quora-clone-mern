import React, { useEffect, useState } from "react";

function QAPostBox() {
  const [questions, setQuestions] = useState([]);
  const [questionsQA, setQuestionsQA] = useState([]);
 const [commentInput, setCommentInput] = useState({
   isActive: false,
   answerId: null,
   text: "",
 });

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/questions/GetQuestionIds"
      );
      if (response.ok) {
        const data = await response.json();
        const questionIdsArray = Array.isArray(data)
          ? data.map((question) => question.questionId)
          : [data.questionIds];
        setQuestions(questionIdsArray);
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
    questions.forEach((questionIds) => {
      questionIds.forEach((questionId) => {
        getQuestionWithAnswer(questionId);
      });
    });
  }, [questions]);

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };const handleAnswerAction = async (answerId, action, additionalData) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/answers/AnswerActionCommentVotes/${answerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action,
            ...additionalData,
          }),
        }
      );
      if (response.ok) {
        console.log(`${action} added successfully`);
      } else {
        console.error(`Error adding ${action}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error adding ${action}:`, error.message);
    }
  };

  const handleUpvote = async (answerId) => {
    await handleAnswerAction(answerId, "upvote");
  };

  const handleDownvote = async (answerId) => {
    await handleAnswerAction(answerId, "downvote");
  };

  

  const handleShare = async (answerId) => {
    const shareType = prompt("Enter share type (public/private):");
    if (shareType) {
      await handleAnswerAction(answerId, "share", { shareType });
    }
  };

  const handleComment = (answerId) => {
    setCommentInput({
      isActive: true,
      answerId,
      text: "",
    });
  };

  const handleCommentSubmit = async () => {
    const { answerId, text } = commentInput;
    if (text) {
      // Perform your comment submission logic here
      console.log(`Comment submitted for answerId ${answerId}: ${text}`);
      setCommentInput({ answerId: null, text: "", isActive: false });
    }
  };

  return (
    <div className="">
      {questionsQA.map((questionaa, index) => (
        <div key={index} className="question-container">
          <div className="question-details">
            <div className="d-flex flex-row mb-3">
              <div className="p-2">
                <h3 className="card-title">{questionaa.questionName}</h3>
              </div>
              <div className="p-2">
                <p className="card-text text-danger">
                  {formatDateString(questionaa.createdAt)}
                </p>
              </div>
            </div>
            {questionaa.answers.map((answer) => (
              <div key={answer._id} className=" answer-container">
                <div className="d-flex flex-row mb-3">
                  <div className="p-2">
                    <p className="card-text ">
                      <small className="text-danger">
                        Answered by: {answer.answeredBy}
                      </small>
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="card-text ">
                      <small className="text-danger">
                        Created at: {formatDateString(answer.createdAt)}
                      </small>
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column mb-3">
                  <div className="p-2">
                    {" "}
                    <p className="card-text ">{answer.answerText}</p>
                  </div>
                </div>

                <div className="d-flex flex-row mb-1 ">
                  <div className="p-2 border-upvotes">
                    <p
                      className="card-text"
                      onClick={() => handleUpvote(answer._id)}
                    >
                      <i className="fa-regular fa-circle-up"></i>Upvotes.
                      {answer.upvotes}
                    </p>
                  </div>
                  <div className="p-2 downvotes">
                    <p
                      className="card-text"
                      onClick={() => handleDownvote(answer._id)}
                    >
                      <i className="fa-regular fa-circle-down"></i>
                      {answer.downvotes}
                    </p>
                  </div>
                  <div class="p-2">
                    <p
                      className="card-text"
                      onClick={() => handleComment(answer._id)}
                    >
                      <i class="fa-regular fa-comment"></i>
                    </p>
                  </div>
                  {commentInput.isActive &&
                    commentInput.answerId === answer._id && (
                      <div>
                        <input
                          type="text"
                          value={commentInput.text}
                          onChange={(e) =>
                            setCommentInput({
                              ...commentInput,
                              text: e.target.value,
                            })
                          }
                        />
                        <button onClick={handleCommentSubmit}>
                          Submit Comment
                        </button>
                      </div>
                    )}

                  <div className="p-2">
                    <p
                      className="card-text"
                      onClick={() => handleShare(answer._id)}
                    >
                      <i className="fa-regular fa-share-from-square"></i>
                      {answer.share}
                    </p>
                  </div>
                  <div className="p-2">
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
