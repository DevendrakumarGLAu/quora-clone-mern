// src/components/Header.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-responsive-modal/styles.css";
import ReactQuill from "react-quill";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "react-quill/dist/quill.snow.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear authentication token, etc.)
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          {/* Left side of the navbar */}
          <ul className="navbar-nav m-auto">
            <li className="nav-item active">
              <Link to="/quora" className="nav-link">
                <i
                  className="fa fa-home"
                  aria-hidden="true"
                  style={{ fontSize: "25px", color: "white" }}
                ></i>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sidebar">
                <i
                  className="fa-solid fa-people-group"
                  style={{ fontSize: "25px", color: "white" }}
                ></i>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/answer">
                <i
                  className="fa-regular fa-pen-to-square"
                  style={{ fontSize: "25px", color: "white" }}></i>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i
                  className="fa-solid fa-bell"
                  style={{ fontSize: "25px", color: "white" }}
                ></i>
              </a>
            </li>
          </ul>

          {/* Right side of the navbar */}
          <ul className="navbar-nav ml-auto">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success search-Button"
                type="submit"
              >
                Search
              </button>
            </form>
            <li className="nav-item dropdown">
              <button onClick={openModal} className="post_btnAnswer">
                Answer
              </button>
              <Modal open={isModalOpen} onClose={closeModal} center>
                {/* Your modal content here */}
              </Modal>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item  bg-danger">
                <Link to="/" className="nav-link btn btn-danger">
                  Log
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
