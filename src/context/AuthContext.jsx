// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================== AUTO LOGIN ==================
useEffect(() => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  if (storedUser && storedUser !== "undefined") {
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.warn("Failed to parse user from localStorage:", err);
      localStorage.removeItem('user');
    }
  }

  if (storedToken && storedToken !== "undefined") {
    setToken(storedToken);
  }

  setLoading(false);
}, []);

  // ================== LOGIN ==================
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    if (newToken) localStorage.setItem('token', newToken);
    if (userData) localStorage.setItem('user', JSON.stringify(userData));
  };

  // ================== LOGOUT ==================
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Kalau token atau user ada, dianggap authenticated
  const isAuthenticated = !!token || !!user;

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
