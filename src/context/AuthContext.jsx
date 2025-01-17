

// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Set up axios instance
const api = axios.create({
  baseURL: baseUrl,
});

// Add request interceptor to attach access token to headers if available
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  // Load tokens and user info from localStorage
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (accessToken && refreshToken && user) {
      setAuth({
        isAuthenticated: true,
        token: accessToken,
        user,
      });
    }
  }, []);

  // Intercept and handle 401 errors to refresh the token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          try {
            const response = await axios.post(`${baseUrl}/refresh/`, {
              refresh: refreshToken,
            });

            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("refresh_token", newRefreshToken);

            setAuth((prev) => ({
              ...prev,
              token: newAccessToken,
            }));

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest); // Retry with the new token
          } catch (refreshError) {
            logout(); // Log out if refresh fails
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  // Login function
  const login = async (username, password) => {
    const response = await fetch(`${baseUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user || ""));

      setAuth({
        isAuthenticated: true,
        token: data.access,
        user: data.user || null,
      });
      return true;
    } else {
      throw new Error("Login failed");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      await api.post("/logout/", { refresh: refreshToken }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Successfully logged out.");
    } catch (error) {
      console.error("Error logging out:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    } finally {
      // Clear local storage and reset auth state
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");

      setAuth({
        isAuthenticated: false,
        token: null,
        user: null,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};
