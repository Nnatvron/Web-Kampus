import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false); // loader hanya saat login

  // REGISTER USER
  const register = (data) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isExist = savedUsers.some(u => u.email === data.email);

    if (isExist) return { success: false, message: "Email sudah terdaftar!" };

    savedUsers.push(data);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    return { success: true };
  };

  // LOGIN USER
  const login = (email, password) => {
    setLoading(true);
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const found = savedUsers.find(u => u.email === email && u.password === password);

    if (!found) {
      setLoading(false);
      return { success: false, message: "Email atau password salah!" };
    }

    const dummyToken = "local-token-" + Date.now();

    setUser(found);
    setToken(dummyToken);
    setLoading(false);

    localStorage.setItem("authUser", JSON.stringify(found));
    localStorage.setItem("authToken", dummyToken);

    return { success: true, user: found };
  };

  // LOGOUT
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
