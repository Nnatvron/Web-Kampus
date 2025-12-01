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
        localStorage.removeItem('user');
      }
    }

    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // ================== LOGIN (LOCAL / DUMMY) ==================
  const login = async (email, password) => {
    // Dummy user
    const dummyUser = {
      id: 1,
      name: "User Lokal",
      email: email
    };

    const dummyToken = "dummy-local-token-123";

    setUser(dummyUser);
    setToken(dummyToken);

    localStorage.setItem("user", JSON.stringify(dummyUser));
    localStorage.setItem("token", dummyToken);

    return { success: true, user: dummyUser };
  };

  // ================== LOGOUT ==================
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!token || !!user;

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
