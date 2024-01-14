import React from "react";
import { useState, useEffect } from "react";
import PostAnswerPopUP from "../postAnswer/answerPopUp/PostAnswerPopUP";
import { Modal } from "react-responsive-modal";


function QuoraContent() {
  const [questions, setQuestions] = useState([]);
  // const [answers, setAnswers] = useState({});
  // const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // const onOpenModal = (questionId) => {
  //   setSelectedQuestionId(questionId);
  //   setOpen(true);
  // };
const fetchQuestions = async () => {
  try {
    const response = await fetch(
      "http://localhost:3001/api/GetALLquestions/get-questions"
    );

    if (response.ok) {
      const data = await response.json();

      // Check if data is an array or a single question object
      const questionsArray = Array.isArray(data) ? data : [data];

      console.log("Fetched Questions Data:", questionsArray);

      setQuestions(questionsArray);

      console.log(
        "Fetched Question IDs:",
        questionsArray.map((q) => q.questionId)
      );
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
                {/* {question._id} */}
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
              <div class="d-flex justify-content-between">
                <button
                  type="button"
                  class="btn btn-light"
                  // onClick={onOpenModal}
                  onClick={() => {
                    const questionId = question.questionId; // Update this line based on the structure
                    console.log("Button Clicked. Question ID:", questionId);
                    onOpenModal(questionId);
                  }}
                >
                  <i class="fa-regular fa-pen-to-square"></i>Answer
                </button>
                <Modal open={open} onClose={onCloseModal} center>
                  <PostAnswerPopUP
                    question={questions.find(
                      (q) =>
                        q.questionId === selectedQuestionId
                        
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
