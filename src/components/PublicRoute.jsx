import React from "react";
import { useAuth } from "../hooks/authContext";

import { Navigate } from 'react-router-dom';
function PublicRoute({children}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/"/> : children;
}

export default PublicRoute;
