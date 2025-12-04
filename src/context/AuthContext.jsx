import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================
  // AUTO LOAD USER
  // =====================
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      const storedToken = localStorage.getItem("authToken");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false); // selesai loading walau gagal
    }
  }, []);

  // =====================
  // REGISTER USER
  // =====================
  const register = (data) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isExist = savedUsers.some(u => u.email === data.email);

    if (isExist) return { success: false, message: "Email sudah terdaftar!" };

    savedUsers.push(data);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    return { success: true };
  };

  // =====================
  // LOGIN USER
  // =====================
  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const found = savedUsers.find(u => u.email === email && u.password === password);

    if (!found) return { success: false, message: "Email atau password salah!" };

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

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
