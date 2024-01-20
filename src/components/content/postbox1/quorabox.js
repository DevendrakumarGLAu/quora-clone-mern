import React, { useState } from "react";
// import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import books from "../postbox1/image/books.png";
import "./quorabox.css";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Auth/authContext";
import AddQuestionModal from "../../AddQuestionModal/AddQuestionModal";
import PostModalPopUP from "./Post/postModalPopUP";

function Quorabox() {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
   const onCloseModal = () => setOpen(false);
   const[openPost, setopenPost] = useState(false);
   const onOpenPost = ()=>setopenPost(true);
   const onClosePost =()=>setopenPost(false);
   const navigate = useNavigate();

const answerNavigate = () => {
  navigate("/answer");
};

  
  return (
    <div>
      {/* <div class="card mt-4"> */}
      {/* <div class="card-body"> */}
      <div className="d-flex flex-row">
        <div className="p-1">
          <img src={books} alt="" style={{ width: "30px", height: "30px" }} />
        </div>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="What do you want to ask or share?"
            onClick={onOpenModal}
          />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <AddQuestionModal />
      </Modal>
      <div className="d-flex justify-content-around align-items-left">
        <div className=" border-end" onClick={onOpenModal}>
          <span className="d-flex align-items-center justify-content-start">
            <i class="fa-regular fa-circle-question"></i>Ask
          </span>
        </div>
        <div className=" border-end">
            {/* this will navigate to the  src/components/postAnswer/postAnswer.js */}
            <span className="d-flex align-items-center justify-content-start" onClick={answerNavigate}>
              <i class="fa-regular fa-pen-to-square"></i>Answer
            </span>
        </div>
        <div className="">
          <span
            className="d-flex align-items-center justify-content-start"
            onClick={onOpenPost}
          >
            <i class="fa-solid fa-pencil"></i>Post
          </span>
          <Modal open={openPost} onClose={onClosePost}  >
        <PostModalPopUP/>
      </Modal>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Quorabox;
