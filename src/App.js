// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/header';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Quora from './components/Quora.js';
import Sidebar from './components/sidebar/Sidebar.js';
import { AuthProvider } from "./components/Auth/authContext";
import NotFound from './components/pageNotFound/NotFound';
import PostAnswer from './components/postAnswer/postAnswer.js';
import CreateSpace from "./components/space/CreateSpace/CreateSpace.js";
import UserSpaceDetails from './components/space/userSpaceDetails/UserSpaceDetails.js';
import PostModalPopup from './components/content/postbox1/Post/postModalPopUP.js';
import Space from './components/space/space.js';
import Loader from './components/loader/Loader.js';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/quora" element={<Quora />} /> */}
            <Route path="/" element={<Quora />} />
            {/* <Route path="/sidebar" element={<Sidebar />} /> */}
            {/* <Rou></Rou> */}
            <Route path="/answer" element={<PostAnswer />} />
            <Route path="/Space" element={<Space/>} />
            <Route path="/PostModalPopUP" element={<PostModalPopup/>}/>
            <Route path="/createSpace" element={<CreateSpace />} />
            <Route path="/UserSpaceDetails/:id" element={<UserSpaceDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* < Loader/> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
