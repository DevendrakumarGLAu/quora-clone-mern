import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [Working, setWorking] = useState("");
  const [Email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/auth/signup", 
        {
        username,
        password,
        Qualifications: qualifications,
        Working: Working,
        Email: Email,
        mobile,
      });
      setMessage("User registered successfully");
      setError("");
      setUsername("");
      setPassword("");
      setQualifications("");
      setWorking("");
      setEmail("");
      setMobile("");
      navigate("/login");
    } catch (error) {
      setMessage("");
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 w-50">
      <div className="card p-4">
        <h2 className="text-center">Signup</h2>
        <form className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="qualifications" className="form-label">
              Qualifications:
            </label>
            <input
              type="text"
              className="form-control"
              id="qualifications"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="Working" className="form-label">
              Working:
            </label>
            <input
              type="text"
              className="form-control"
              id="Working"
              value={Working}
              onChange={(e) => setWorking(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="Email" className="form-label">
              Email:
            </label>
            <input
              type="Email"
              className="form-control"
              id="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="mobile" className="form-label">
              Mobile:
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="mb-3 col-md-6">
            
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
        <p className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
