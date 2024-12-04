// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists in localStorage
  return token ? children : <Navigate to="/login" />; // Redirect to login if no token
};

export default ProtectedRoute;
    