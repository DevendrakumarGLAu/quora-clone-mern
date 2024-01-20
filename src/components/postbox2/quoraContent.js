import React, { useState, useEffect } from "react";
import PostAnswerPopUP from "../postAnswer/answerPopUp/PostAnswerPopUP";
import { Modal } from "react-responsive-modal";
// import QAPostBox from "../content/QAPostBox/QAPostBox";

function QuoraContent() {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/GetALLquestions/get-questions"
      );
      if (response.ok) {
        const data = await response.json();
        const questionsArray = Array.isArray(data) ? data : [data];
        setQuestions(questionsArray);
      } else {
        console.error("Error fetching questions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  const onOpenModal = (questionId) => {
    console.log("Selected Question ID:", questionId);
    setSelectedQuestionId(questionId);
    setOpen(true);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
// console.log("Questions in QuoraContent:", questions);
// console.log(
//   "Question IDs in QuoraContent:",
//   questions.map((q) => q.questionId)
// );
  return (
    <div>
      {questions.map((question, index) => (
        <div key={index} className="card mt-2">
          <div className="card-body">
            <div className="d-flex flex-column mb-3">
              <div className="p-2" style={{ marginLeft: "2px" }}>
                <h3 style={{ textAlign: "left" }}>
                  {index + 1}. {question.questionName}
                </h3>
              </div>
              <div
                className="mt-0"
                style={{
                  textAlign: "left",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  width: "max-content",
                }}
              >
                {new Date(question.createdAt).toLocaleDateString("en-UK", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => onOpenModal(question.questionId)}
                >
                  <i className="fa-regular fa-pen-to-square"></i>Answer
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
