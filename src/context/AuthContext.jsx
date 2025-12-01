// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================
  // AUTO LOAD USER
  // =====================
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      const storedToken = localStorage.getItem("authToken");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedToken) {
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    }

    setLoading(false);
  }, []);

  // =====================
  // REGISTER USER
  // =====================
  const register = (data) => {
    /**
     * data harus berisi:
     * {
     *   nama,
     *   nim,
     *   jurusan,
     *   semester,
     *   jenjang,
     *   email,
     *   password
     * }
     */

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const isExist = savedUsers.some((u) => u.email === data.email);

    if (isExist) {
      return { success: false, message: "Email sudah terdaftar!" };
    }

    savedUsers.push(data);

    localStorage.setItem("users", JSON.stringify(savedUsers));

    return { success: true };
  };

  // =====================
  // LOGIN USER
  // =====================
  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const found = savedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: "Email atau password salah!" };
    }

    const dummyToken = "local-token-" + Date.now();

    setUser(found);
    setToken(dummyToken);

    localStorage.setItem("authUser", JSON.stringify(found));
    localStorage.setItem("authToken", dummyToken);

    return { success: true, user: found };
  };

  // =====================
  // LOGOUT
  // =====================
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };

  // =====================
  // AUTH CHECK
  // =====================
  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
