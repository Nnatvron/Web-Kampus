import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";  // ⬅️ WAJIB ADA
import Dashboard from "./Dashboard/Dashboard";
import ResetForm from "./components/Reset/Reset";
import Loader from "./components/Loader/Loader";

import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  {/* ⬅️ ini */}
          <Route path="/reset" element={<ResetForm />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
