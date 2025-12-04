// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import ResetForm from "./components/Reset/Reset";
import Kalender from "./components/Kalender/Kalender";
import Jadwal from "./components/Jadwal/Jadwal";
import ProtectedLayout from "./layout/ProtectedLayout";

// import ToastContainer dan CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetForm />} />

          {/* PROTECTED ROUTES */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            {/* Default redirect ke dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="kalender" element={<Kalender />} />
            <Route path="jadwal" element={<Jadwal />} />
          </Route>

          {/* CATCH ALL REDIRECT */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>

        {/* Toast container global */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
