import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import AddQuestionModal from "../AddQuestionModal/AddQuestionModal";
import PostModalPopup from "../content/postbox1/Post/postModalPopUP";

function AllpopModal() {
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);

  const onOpenAddQuestion = () => setOpenAddQuestion(true);
  const onCloseAddQuestion = () => setOpenAddQuestion(false);

  const onOpenCreatePost = () => setOpenCreatePost(true);
  const onCloseCreatePost = () => setOpenCreatePost(false);

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <span
              className="d-flex align-items-center justify-content-start btn btn-light"
              onClick={onOpenAddQuestion}
            >
              <i className="fa-regular fa-circle-question"></i> Add Question
            </span>
            <Modal open={openAddQuestion} onClose={onCloseAddQuestion}>
              <AddQuestionModal />
            </Modal>
          </div>
          <div className="col">
            <span
              className="d-flex align-items-center justify-content-start btn btn-light"
              onClick={onOpenCreatePost}
            >
              <i className="fa-regular fa-circle-question"></i> Create Post
            </span>
            <Modal open={openCreatePost} onClose={onCloseCreatePost}>
              <PostModalPopup />
            </Modal>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AllpopModal;
