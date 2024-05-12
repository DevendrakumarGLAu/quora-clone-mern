import React from "react";
import Quorabox from "../content/postbox1/quorabox";
// import QuoraContent from '../postbox2/quoraContent';
import QAPostBox from "./QAPostBox/QAPostBox";
import GetPostData from "./postbox1/Post/GetPostData/GetPostData";

function Content() {
  return (
    <div>
      <div className="row">
        <div className="col-md-12"><Quorabox /></div>
        <div className="col-md-12"><GetPostData /></div>
        <div className="col-md-12"><QAPostBox /></div>
      </div>
    </div>
  );
}

export default Content;
