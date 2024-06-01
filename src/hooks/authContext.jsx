import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => setIsAuthenticated(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("stored",storedUser)
    if (storedUser) {
      setIsAuthenticated(true);
      console.log(isAuthenticated)
      setUser(JSON.parse(storedUser));
      console.log(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
