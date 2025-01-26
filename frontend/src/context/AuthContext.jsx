import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [user, setUser] = useState({
    email: Cookies.get("email") || "",
    username: Cookies.get("username") || "",
    role: Cookies.get("role") || "",
  });

  const saveToken = (newToken) => {
    setToken(newToken);
    Cookies.set("token", newToken);
  };

  const saveUser = (userData) => {
    setUser(userData);
    Cookies.set("email", userData.email);
    Cookies.set("username", userData.username);
    Cookies.set("role", userData.role);  
  };

  return (
    <AuthContext.Provider value={{ token, user, saveToken, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthContext);
