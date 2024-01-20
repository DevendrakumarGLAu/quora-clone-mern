import React, { useState } from "react";
import books from "../image/books.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostModalPopup() {
  const [content, setContent] = useState("");

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6">Add Question</div>
          <div className="col-md-6">Create Post</div>
        </div>
        <div className="row">
          <div className="col-12">
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
              <div className="p-1">Devendra</div>
            </div>
          </div>
          <div className="col-6">Experience</div>
        </div>
      </div>
      <div className="col-12">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(value) => setContent(value)}
        />
      </div>
      <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-danger">Danger</button>
      <button type="button" class="btn btn-primary">Primary</button>
      </div>
    </div>
  );
}

export default PostModalPopup;
