// src/components/Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Quora from '../components/Quora';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
        const port = process.env.REACT_APP_BACKEND_URL;
        console.log("login port",port);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
                // "http://localhost:3001/api/auth/login",
                { username, password, },
            );
            // console.log(response);
            const token = response.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("username", username);
            // setIsLoggedIn(true);
            // console.log(isLoggedIn);
            startSessionTimer();
            navigate("/");
        } catch (error) {
            console.error(error.response.data.error);
            setError("Invalid username or password");
        }
    };
    // useEffect(() => {
    //     console.log(isLoggedIn);
    // }, [isLoggedIn]);

    const startSessionTimer = () => {
        const sessionTimeout = 30 *60* 1000; 
        const timeoutId = setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("username");
            navigate("/login");
        }, sessionTimeout);
        const resetTimer = () => clearTimeout(timeoutId);
        document.addEventListener("mousemove", resetTimer);
        document.addEventListener("keypress", resetTimer);
    };


    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4">
                <h2 className="text-center">Login</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleLogin}>
                    Login
                </button>
                {error && <p className="text-danger mt-3">{error}</p>}
                <div className="mt-3">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
