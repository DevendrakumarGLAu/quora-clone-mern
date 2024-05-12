import React, { useState, useEffect } from "react";
import PostAnswerPopUP from "../postAnswer/answerPopUp/PostAnswerPopUP";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useNavigate } from "react-router-dom";

function QuoraContent() {
  const [questions, setQuestions] = useState([]);
  // const navigate = useNavigate();
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [open, setOpen] = useState(false); 
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/GetALLquestions/get-questions"
      );
      if (response.ok) {
        const data = await response.json();
        setQuestions(Array.isArray(data) ? data : [data]);
      } else {
        console.error("Error fetching questions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  const onOpenModal = (questionId) => {
    // console.log("question ids",questionId);
    setSelectedQuestionId(questionId);
    setOpen(true);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="">
      {questions.map((question, index) => (
        <div key={index} className="card mt-2">
          <div className="card-body">
            <div className="d-flex flex-column">
              <div className="p-2">
                <h3>{index + 1}. {question.questionName}</h3>
              </div>
              <div className="mt-2">
                <small className="border p-1">
                  {new Date(question.createdAt).toLocaleDateString("en-UK", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => onOpenModal(question.questionId)}
                >
                  <i className="far fa-edit"></i> Answer
                </button>
                <Modal open={open} onClose={() => setOpen(false)} center>
                  <PostAnswerPopUP
                    question={questions.find(
                      (q) => q.questionId === selectedQuestionId
                    )}
                    questionId={selectedQuestionId}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuoraContent;
