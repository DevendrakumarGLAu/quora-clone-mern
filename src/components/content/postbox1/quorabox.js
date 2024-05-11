import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import books from "../postbox1/image/books.png";
import "bootstrap/dist/css/bootstrap.min.css";
import AddQuestionModal from "../../AddQuestionModal/AddQuestionModal";
import PostModalPopUP from "./Post/postModalPopUP";
import { useNavigate } from "react-router-dom";

function Quorabox() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(sessionStorage.getItem("username")); // Get username from localStorage
  const navigate = useNavigate();

  // const onOpenModal = () => setOpen(true);
  const onOpenModal = () => {
    if (username) { // Check if username is present
      setOpen(true);
    } else {
      const shouldLogin = window.confirm("Please login to ask a question. Do you want to proceed to login?");
    if (shouldLogin) {
      navigate("/login");
    }
    }
  };
  const onCloseModal = () => setOpen(false);
  const [openPost, setOpenPost] = useState(false);
  // const onOpenPost = () => setOpenPost(true);
  const onOpenPost = () => {
    if (username) { // Check if username is present
      setOpen(true);
    } else {
      const shouldLogin = window.confirm("Please login to post content. Do you want to proceed to login?");
    if (shouldLogin) {
      navigate("/login");
    }
    }
  };
  const onClosePost = () => setOpenPost(false);


  const answerNavigate = () => {
    if(username){
    navigate("/answer");
    }
    else{
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
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control p-1"
            placeholder="What do you want to ask or share?"
            onClick={onOpenModal}
          />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <AddQuestionModal />
      </Modal>
      <div className="card-footer d-flex justify-content-around">
        <div className=" mr-auto border-end" onClick={onOpenModal}>
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
          <span className="btn btn-success" role="button" onClick={onOpenPost}>
            <i className="fas fa-pencil-alt"></i> Post
          </span>
          <Modal open={openPost} onClose={onClosePost}>
            <PostModalPopUP />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Quorabox;
