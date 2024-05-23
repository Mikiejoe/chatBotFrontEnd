import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;