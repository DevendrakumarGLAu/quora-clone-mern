import React, { useState, useEffect } from "react";
import books from "../image/books.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function PostModalPopup({ content = "", editMode = false, postId }) {
  const [modalContent, setModalContent] = useState(content);
  const [image, setImage] = useState(null);
  const Navigate = useNavigate();
  const handleFileSelect = (event) => {
    // Handle file selection logic here
  };

 const postContent = async () => {
  try {
    const username = sessionStorage.getItem("username");
    if (!username) {
      console.error("Username not found");
      return;
    }
    if (!modalContent.trim()) {
      console.error("Content is empty");
      return;
    }
    
    let url, method, body;

    if (editMode) {
      console.log("edit post id", postId);
      url = `http://localhost:3001/api/posts/updatePost/${postId}`;
      method = "PUT";
      body = {
        postId: postId,
        username,
        content: modalContent,
      };
    } else {
       url = "http://localhost:3001/api/posts/postContent";
       method = "POST";
       body = {
        username,
        content: modalContent,
       };
    }

    // console.log("URL:", url);
    // console.log("Request Body:", body);
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // console.log("response", response);
    if (response.ok) {
      // alert("Post created/updated successfully");
      window.location.reload();
      // Navigate("/");
    } else {
      console.error("Error creating/updating post");
    }
  } catch (error) {
    console.error("Error creating/updating post:", error);
  }
};

  

  useEffect(() => {
    // console.log("Content prop in PostModalPopup:", content);
    setModalContent(content); // Initialize modalContent with content prop
  }, [content]);

  useEffect(() => {
    // console.log("Modal content state:", modalContent);
  }, [modalContent]);

  return (
    <div>
      <div className="container d-flex justify-content-around">
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
              <div className="p-1">
                {sessionStorage.getItem("username")}
              </div>
            </div>
          </div>
          {/* <div className="col-6">{sessionStorage.getItem("working")}</div> */}
        </div>
      </div>
      <div className="col-12">
        <ReactQuill
          style={{ width: "600px", height: "300px" }}
          theme="snow"
          value={modalContent}
          onChange={(value) => setModalContent(value)}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e)}
      />
      <div className="d-flex justify-content-end mt-5">
        <button type="button" className="btn btn-danger mt-3 mx-2" onClick={() => Navigate("/")}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={postContent}
        >
          {editMode ? "Update Post" : "Add Post"}
        </button>
      </div>
    </div>
  );
}

export default PostModalPopup;
