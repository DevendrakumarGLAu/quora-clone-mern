import React, { useState } from "react";
import books from "../image/books.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostModalPopup() {
  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);

  const postContent = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const formData = new FormData();
      formData.append("content", content);
      formData.append("username", username);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("http://localhost:3001/api/posts/postContent", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Post created successfully");
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };


  return (
    <div>
      <div className="container d-flex justify-content-between">
        <div className="row">
            <div className="col-md-6">Add Question</div>
            <div className="col-md-6">Create Post</div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-row mb-3">
              <div className="">
                <img
                  src={books}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div className="">
                <i className="fa-solid fa-caret-right"></i>
              </div>
              <div className="p-1">{sessionStorage.getItem("username")}</div>
            </div>
          </div>
          <div className="col-6">{sessionStorage.getItem("working")}</div>
        </div>
      </div>
      <div className="col-12">
        <ReactQuill
          style={{ width: "600px", height: "300px" }}
          theme="snow"
          value={content}
          onChange={(value) => setContent(value)}
        />
      </div>
      <div class="d-flex justify-content-end mt-5">
        <button type="button" class="btn btn-danger mt-3 mx-2">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" onClick={postContent}>
          Add Post
        </button>
      </div>
    </div>
  );
}
export default PostModalPopup;
