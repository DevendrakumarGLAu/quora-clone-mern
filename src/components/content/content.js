import React from "react";
import Quorabox from "../content/postbox1/quorabox";
// import QuoraContent from '../postbox2/quoraContent';
import QAPostBox from "./QAPostBox/QAPostBox";
import GetPostData from "./postbox1/Post/GetPostData/GetPostData";

function Content() {
  return (
    <div>
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <div className="d-flex flex-column">
            <div className="">
              <Quorabox />
            </div>
          </div>
        </div>
      </div>
      <GetPostData />
      <div className="card mt-4" style={{ width: "40rem" }}>
        <div className="card-body">
          <div className="d-flex flex-column">
            <div className="p-2">
              <QAPostBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
