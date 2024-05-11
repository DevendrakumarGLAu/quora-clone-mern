import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import books from "../content/postbox1/image/books.png";
import AllpopModal from "../AllPopModal/AllpopModal";
import { useNavigate } from "react-router-dom";

function AddQuestionModal() {
  const [openPublic, setOpenPublic] = useState(false);
  const [question, setQuestion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleAddQuestion = async () => {
    try {
      const questionName = question.trim();
      const questionUrl = window.location.href;
      if (!questionName) {
        setErrorMessage("Question cannot be empty");
        return;
      }
      const response = await fetch(
        "http://localhost:3001/api/questions/submit-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionName,
            questionUrl,
          }),
        }
      );
      if (response.ok) {
        console.log("Question submitted successfully");
        window.location.reload();
      } else {
        console.error("Error submitting question:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting question:", error.message);
    }
  };

  const openModalPublic = () => setOpenPublic(true);
  const closeModalPublic = () => setOpenPublic(false);

  return (
    <div>
      <span className="border-bottom">
        <AllpopModal />
      </span>
      <ul className="list-group mt-2">
        <h3>Tips on getting good answers quickly</h3>
        <li className="list-group-item">
          Make sure your question has not been asked already
        </li>
        <li className="list-group-item list-group-item-primary">
          Keep your question short and to the point
        </li>
        <li className="list-group-item list-group-item-secondary">
          Double-check grammar and spelling
        </li>
      </ul>
      <div className="d-flex flex-row mb-3">
        <div className="p-1">
          <img
            src={books}
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <div className="p-1">
          <i className="fa-solid fa-caret-right"></i>
        </div>
        <div className="p-1">
          <div className="publicBox">
            <i className="fa-solid fa-user-group"></i>public
            <i
              className="fa-solid fa-caret-down"
              onClick={openModalPublic}
            ></i>
            <Modal open={openPublic} onClose={closeModalPublic} center>
              <h3>
                Public Others will see your identity alongside this question on
                your profile and in their feeds. Limited Your identity will be
                shown but this question will not appear in your followers' feeds
                or your profile.
              </h3>
            </Modal>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row mt-1">
        <form>
          <textarea
            rows="4"
            cols="100"
            placeholder='Start your question with "What", "How", "Why", etc.'
            className="textareaModification form-control"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setErrorMessage("");
            }}
          />
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </form>
      </div>
      <div className="d-flex justify-content-end mt-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddQuestion}
        >
          Add question
        </button>
      </div>
    </div>
  );
}

export default AddQuestionModal;
