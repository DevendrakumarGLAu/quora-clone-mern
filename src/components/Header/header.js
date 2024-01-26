import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-responsive-modal/styles.css";
// import ReactQuill from "react-quill";
import Modal from "react-responsive-modal";
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
    <div className="position-fixed z-3 mt-0" style={{width:"100%"}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-white " >
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
                to="/quora"
                className="nav-link active active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sidebar"
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
              <Link to="#" className="nav-link">
                Notifications
              </Link>
            </li>
          </ul>

          {/* Right side of the navbar */}
          <ul className="navbar-nav ml-auto">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Quora"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-light search-Button"
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
                {/* Your modal content here */}
              </Modal>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link btn btn-danger active mt-2"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/" style={{ color: "white",marginLeft:"10px" }}
                  className="nav-link btn btn-danger active mt-1"
                  aria-current="page"
                >
                  Logout
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
