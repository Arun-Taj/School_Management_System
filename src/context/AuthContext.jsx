// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Provide AuthContext to the app
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuth({
        isAuthenticated: true,
        token,
        user: JSON.parse(localStorage.getItem("user")),
      });
    }
  }, []);

  const login = async (username, password) => {
    // Call login API
    const response = await fetch(`${baseUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password:password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store the JWT token and user information in localStorage
      
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user? data.user : ''));

      // Update auth state
      setAuth({
        isAuthenticated: true,
        token: data.access,
        user: data.user ? data.user : null,
      });
      return true;
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
