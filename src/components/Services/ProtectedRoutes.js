import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
    </>
  );
}

export default ProtectedRoutes;
