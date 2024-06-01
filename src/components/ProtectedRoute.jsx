import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

const ProtectedRoute = ({ children }) => {
  const { login,isAuthenticated } = useAuth();

  const user = localStorage.getItem("user")
  console.log("user",user);
  // // if(user){
  // //   // login(JSON.parse(user))
  // //   console.log("user",user);
  // // }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
