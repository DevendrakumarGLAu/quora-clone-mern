// NotFound.js

import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Create this CSS file for styling
import GIF from "./pageNotFoundGIF.gif"

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <img
        src={GIF} // Replace with your image URL
        alt="Page Not Found"
        className="img-fluid"
      />
      <h1 className="mt-4">Page Not Found</h1>
      <p className="lead">
        The page you are looking for might be in another universe.
      </p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
    </div>
  );
};

export default NotFound;
