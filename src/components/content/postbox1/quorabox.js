import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import books from "../postbox1/image/books.png";
import "bootstrap/dist/css/bootstrap.min.css";
import AddQuestionModal from "../../AddQuestionModal/AddQuestionModal";
import PostModalPopUP from "./Post/postModalPopUP";
import { useNavigate } from "react-router-dom";

function Quorabox() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const navigate = useNavigate();
const [openQuestion, setOpenQuestion] = useState(false);

  const onOpenModal = () => {
    const token = localStorage.getItem('token')
    console.log("token in quorabox",token)
    if (token) {
      setOpen(true);
    } else {
      const shouldLogin = window.confirm("Token expire. Do you want to proceed to login?");
      if (shouldLogin) {
        navigate("/login");
      }
    }
  };
  const onOpenQuestion = () => {
    if (username) {
      setOpenQuestion(true);
    } else {
      const shouldLogin = window.confirm("Please login to Add Question. Do you want to proceed to login?");
      if (shouldLogin) {
        navigate("/login");
      }
    }
  }

  const onCloseModal = () => setOpen(false);
  const onCloseQuestion = () => setOpenQuestion(false);
  const answerNavigate = () => {
    if (username) {
      navigate("/answer");
    } else {
      const shouldLogin = window.confirm("Please login to answer. Do you want to proceed to login?");
      if (shouldLogin) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="card">
      <div className="card-body d-flex flex-row align-items-center">
        <div className="p-1">
          <img src={books} alt="" style={{ width: "30px", height: "30px" }} />
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What do you want to ask or share?"
            onClick={onOpenQuestion}
          />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <PostModalPopUP />
      </Modal>
      <Modal open={openQuestion} onClose={onCloseQuestion} center>
      <AddQuestionModal onClose={onCloseQuestion} />
    </Modal>
      <div className="card-footer d-flex justify-content-around">
        <div className=" mr-auto border-end" onClick={onOpenQuestion}>
          <span className="btn btn-success" role="button">
            <i className="far fa-circle"></i> Ask
          </span>
        </div>
        <div className="mr-auto border-end">
          <button
            className="btn btn-success"
            role="button"
            onClick={answerNavigate}
          >
            <i className="far fa-edit"></i> Answer
          </button>
        </div>
        <div>
          <span className="btn btn-success" role="button" onClick={onOpenModal}>
            <i className="fas fa-pencil-alt"></i> Post
          </span>
        </div>
      </div>
    </div>
  );
}

export default Quorabox;
