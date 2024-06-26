import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-responsive-modal/styles.css";
// import ReactQuill from "react-quill";
import Modal from "react-responsive-modal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AllpopModal from "../AllPopModal/AllpopModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  // console.log("loggin heder", isLoggedIn1)
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    // isLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <div className="sticky-top z-3 mt-0" style={{ width: "100%" ,boxShadow:"rgba(0, 30, 43, 0.1) 0px 4px 4px 0px"}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white ">
          <div className="container-fluid">
            <Link
              to="/quora"
              className="navbar-brand text-danger"
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                marginLeft: "180px",
              }}
            >
              Quora
            </Link>
            {/* Left side of the navbar */}
            <ul className="navbar-nav m-auto">
              <li className="nav-item active">
                <Link
                  to="/"
                  className="nav-link active active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Space"
                  className="nav-link active active"
                  aria-current="page"
                >
                  Spaces
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/answer"
                  className="nav-link active"
                  aria-current="page"
                >
                  Answer
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/notifications" className="nav-link">
                  Notifications
                </Link>
              </li>
            </ul>

            {/* Right side of the navbar */}
            <ul className="navbar-nav ml-auto">
              <form className="d-flex" role="search">
                <input
                  className="form-control mr-2"
                  type="search"
                  placeholder="Search Quora"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-light search-Button mr-2"
                  type="submit"
                  style={{ color: "black" }}
                >
                  Search
                </button>
              </form>
              <li className="nav-item">
                <button
                  onClick={openModal}
                  className="post_btnAnswer btn btn-primary mt-1"
                >
                  Answer
                </button>
                <Modal open={isModalOpen} onClose={closeModal} center>
                  <AllpopModal/>
                </Modal>
              </li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <button
                    type="button"
                    style={{ color: "white", marginLeft: "10px" }}
                    className="nav-link btn btn-danger active mt-1"
                    aria-current="page"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    style={{ color: "white", marginLeft: "10px" }}
                    className="nav-link btn btn-danger active mt-1"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
