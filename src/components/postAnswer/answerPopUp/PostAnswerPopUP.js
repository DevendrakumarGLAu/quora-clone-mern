import React, { useState } from "react";
import books from "./image/books.png";
import { useNavigate } from "react-router-dom";

function PostAnswerPopUP({ question, questionId }) {
  const [answerText, setAnswerText] = useState("");
  const Navigate = useNavigate();

  const handlePostAnswer = async () => {
    try {
      const username = sessionStorage.getItem("username");

      if (!username) {
        console.error("Username not available in session storage");
        return;
      }

      const response = await fetch(
        `http://localhost:3001/api/answers/answer-question/${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answerText,
            answeredBy: username,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Answer submitted successfully:", data.message);
        setAnswerText("");
        Navigate("/answer");
        window.location.reload();
      } else {
        console.error("Error submitting answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <div className="row mb-3" style={{width: "100%"}}>
        <div className="col-auto">
          <img src={books} alt="Books icon" style={{ width: "20px", height: "20px" }} />
        </div>
        <div className="col-auto">
          <i className="fas fa-caret-right"></i>
        </div>
        <div className="col-auto">
          <p>{sessionStorage.getItem("username")}</p>
        </div>
      </div>

      <div className="mb-3">
        <p>{question.questionName}</p>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <textarea
            rows="10"
            className="form-control"
            placeholder="Write your answer here"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
        </div>
      </div>

      <div className="row justify-content-end">
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePostAnswer}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostAnswerPopUP;
