// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header/header';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Quora from './components/Quora.js';
import Sidebar from './components/sidebar/Sidebar.js';
import { AuthProvider } from "./components/Auth/authContext";
import NotFound from './components/pageNotFound/NotFound';
import QuoraContent from './components/postbox2/quoraContent.js';
import PostAnswer from './components/postAnswer/postAnswer.js';
import Header from './components/Header/header.js';

function App() {
  return (
    <AuthProvider>
      
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/quora" element={<Quora />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/answer" element={<PostAnswer/>} />
            {/* <Route path="/answer" element={<QuoraContent/>}/> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
