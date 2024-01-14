// src/components/postAnswer/answerPopUp/PostAnswerPopUP.js
import React, { useState } from "react";
import books from "./image/books.png";
import {  useNavigate } from "react-router-dom";

function PostAnswerPopUP({ question, questionId }) {
  const [answerText, setAnswerText] = useState("");
  const[username,setusername]=useState("")
  const[questionName,setquestionName]=useState("")
  const Navigate= useNavigate();
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
            answerText: answerText,
            answeredBy: username,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Answer submitted successfully:", data.message);
        setAnswerText("");
        setusername("");
        setquestionName("");
        Navigate('/answer')
        window.location.reload()
      } else {
        console.error("Error submitting answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div className="d-flex flex-row mb-3">
        <div className="p-1">
          <img src={books} alt="" style={{ width: "20px", height: "20px" }} />
        </div>
        <div className="p-1">
          <i className="fa-solid fa-caret-right"></i>
        </div>
        <div className="p-1">
          <p value={username} onChange={(e) => setusername(e.target.value)}>
            {sessionStorage.getItem("username")}
          </p>
        </div>
      </div>

      <div className="p-1">
        <p>
          <p
            value={questionName}
            onChange={(e) => setquestionName(e.target.value)}
          >
            {question.questionName}
          </p>
        </p>
      </div>
      <div className="d-flex flex-row mt-1">
        <form>
          <textarea
            rows="10"
            cols="100"
            placeholder="Write your answer here"
            className="textareaModification"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
        </form>
      </div>
      <div className="d-flex flex-row-reverse">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePostAnswer}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default PostAnswerPopUP;
