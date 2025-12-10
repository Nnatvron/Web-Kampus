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
import Pembayaran from "./components/Pembayaran/Pembayaran"

import Nilai from "./components/Nilai/Nilai";
import NilaiTugas from "./components/NilaiTugas/NilaiTugas";
import NilaiUTS from "./components/NilaiUTS/NilaiUTS"
import NilaiUTSMurni from "./components/NilaiUTSMurni/NilaiUTSMurni"
import NilaiUAS from "./components/NilaiUAS/NilaiUAS"
import NilaiUASMurni from "./components/NilaiUASMurni/NilaiUASMurni";
import NilaiHER from "./components/NilaiHER/NilaiHER";
import NilaiHERmurni from "./components/NilaiHERMurni/NilaiHERMurni";

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
            {/* Default redirect */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="kalender" element={<Kalender />} />
            <Route path="jadwal" element={<Jadwal />} />
            <Route path="nilai" element={<Nilai />} />
            <Route path="pembayaran" element={<Pembayaran />} />

            {/* NILAI DETAIL PAGES */}
            <Route path="nilai/tugas" element={<NilaiTugas />} />
            <Route path="nilai/uts" element={<NilaiUTS />} />
            <Route path="nilai/uts-murni" element={<NilaiUTSMurni />} />
            <Route path="nilai/uas" element={<NilaiUAS />} />
            <Route path="nilai/uas-murni" element={<NilaiUASMurni />} />
            <Route path="nilai/her" element={<NilaiHER />} />
            <Route path="nilai/her-murni" element={<NilaiHERmurni />} />
          </Route>

          {/* PEMBAYARAN PAGES */}


          {/* CATCH ALL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* TOAST */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
