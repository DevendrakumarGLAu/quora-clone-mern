import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function QAPostBox() {
  const [questions, setQuestions] = useState([]);
  const [questionsQA, setQuestionsQA] = useState([]);
 const [commentInput, setCommentInput] = useState({
   isActive: false,
   answerId: null,
   text: "",
 });
 const PORT= process.env.REACT_APP_BACKEND_URL

  // const fetchQuestions = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3001/api/questions/GetQuestionIds"
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       const questionIdsArray = Array.isArray(data)
  //         ? data.map((question) => question.questionId)
  //         : [data.questionIds];
  //       setQuestions(questionIdsArray);
  //     } else {
  //       console.error("Error fetching questions:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching questions:", error.message);
  //   }
  // };

  const getQuestionWithAnswer = async () => {
    try {
      const response = await fetch(
        `${PORT}/api/answers/questions-with-answers`
        // `http://localhost:3001/api/answers/questions-with-answers`
      );
      if (response.ok) {
        const questionWithAnswers = await response.json();
        setQuestionsQA(questionWithAnswers);
        // console.log("Question with answers:", questionWithAnswers); // Log the response
      //   if (questionWithAnswers && questionWithAnswers.answers) { // Check if answers array exists
      //     setQuestionsQA((prevQuestions) => [
      //       ...prevQuestions,
      //       questionWithAnswers,
      //     ]);
      //   }
      // } else {
      //   console.error(
      //     "Error fetching question with answer:",
      //     response.statusText
      //   );
      }
    } catch (error) {
      console.error("Error fetching question with answer:", error.message);
    }
  };
  

  

  useEffect(() => {
    // fetchQuestions();
    getQuestionWithAnswer();
  }, []);

  // useEffect(() => {
  //   questions.forEach((questionIds) => {
  //     questionIds.forEach((questionId) => {
  //       getQuestionWithAnswer(questionId);
  //     });
  //   });
  // }, [questions]);

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
        `${PORT}/api/answers/AnswerActionCommentVotes/${answerId}`,
        // `http://localhost:3001/api/answers/AnswerActionCommentVotes/${answerId}`,
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
    <div className=" mt-4">
      {questionsQA.map((question, index) => (
        <div key={index} className="card mb-3">
          <div className="card-header">
            <h5 className="card-title">{question.questionName}</h5>
            <p className="card-text text-muted">Created at: {formatDateString(question.createdAt)}</p>
          </div>
          <div className="card-body">
            {question.answers.length > 0 ? (
              question.answers.map((answer) => (
                <div key={answer._id} className="mb-3">
                  <p className="card-text">Answer: {answer.answerText}</p>
                  <p className="card-text text-muted">Answered by: {answer.answeredBy}</p>
                  <p className="card-text text-muted">Created at: {formatDateString(answer.createdAt)}</p>
                  {/* Additional UI elements */}
                  <hr />
                  <div className="d-flex flex-row mb-1 ">
                    <div className="p-2 border-upvotes">
                      <p className="card-text" onClick={() => handleUpvote(answer._id)}>
                        <i className="fa-regular fa-circle-up"></i>Upvotes: {answer.upvotes}
                      </p>
                    </div>
                    <div className="p-2 downvotes">
                      <p className="card-text" onClick={() => handleDownvote(answer._id)}>
                        <i className="fa-regular fa-circle-down"></i>Downvotes: {answer.downvotes}
                      </p>
                    </div>
                    <div className="p-2">
                      <p className="card-text" onClick={() => handleComment(answer._id)}>
                        <i className="fa-regular fa-comment"></i> Comment
                      </p>
                    </div>
                    {commentInput.isActive && commentInput.answerId === answer._id && (
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
                        <button onClick={handleCommentSubmit}>Submit Comment</button>
                      </div>
                    )}
                    <div className="p-2">
                      <p className="card-text" onClick={() => handleShare(answer._id)}>
                        <i className="fa-regular fa-share-from-square"></i> Share: {answer.share}
                      </p>
                    </div>
                    <div className="p-2">
                      <p className="card-text">
                        <small className="text-muted">Last updated: {formatDateString(answer.updatedAt)}</small>
                      </p>
                    </div>
                  </div>
                  
                </div>
              ))
            ) : (
              <p className="card-text">No answers available <Link to="/answer">Answer</Link></p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default QAPostBox;
