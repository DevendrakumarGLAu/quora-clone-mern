import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "../sidebar/Sidebar";
import CreateSpace from "./CreateSpace/CreateSpace";
import Header from "../Header/header";
import Widget from "../Widget/Widget";



function Space() {
  return (
    <div>
      <Header />
      <div class="d-flex justify-content-evenly">
        {/* <div class="p-2"><Sidebar/></div> */}
        <div class="d-flex flex-row mb-3">
          <div class="p-2">
            <Sidebar />
          </div>
          <div class="p-2">
            <CreateSpace />
          </div>
          <div class="p-2">
            <Widget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Space;
