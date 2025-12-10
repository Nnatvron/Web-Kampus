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
import Pembayaran from "./components/Pembayaran/Pembayaran";
import Skripsi from "./components/Skripsi/Skripsi";
import Beasiswa from "./components/Beasiswa/Beasiswa";
import Materi from "./components/Materi/Materi";
import Ujian from "./components/Ujian/Ujian";
import Tugas from "./components/Tugas/Tugas";
import Setting from "./components/Setting/Setting";
import Profile from "./components/Profile/Profile";
import UKT from "./components/UKT/UKT"; // <-- import UKT

import Nilai from "./components/Nilai/Nilai";
import NilaiTugas from "./components/NilaiTugas/NilaiTugas";
import NilaiUTS from "./components/NilaiUTS/NilaiUTS";
import NilaiUTSMurni from "./components/NilaiUTSMurni/NilaiUTSMurni";
import NilaiUAS from "./components/NilaiUAS/NilaiUAS";
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
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />

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

            {/* DASHBOARD */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="kalender" element={<Kalender />} />
            <Route path="jadwal" element={<Jadwal />} />
            <Route path="nilai" element={<Nilai />} />
            <Route path="skripsi" element={<Skripsi />} />
            <Route path="pembayaran" element={<Pembayaran />} />
            <Route path="beasiswa" element={<Beasiswa />} />
            <Route path="materi" element={<Materi />} />
            <Route path="ujian" element={<Ujian />} />
            <Route path="tugas" element={<Tugas />} />

            {/* UKT PAYMENT FLOW */}
            <Route path="pembayaran/ukt" element={<UKT />} />

            {/* NILAI DETAIL PAGES */}
            <Route path="nilai/tugas" element={<NilaiTugas />} />
            <Route path="nilai/uts" element={<NilaiUTS />} />
            <Route path="nilai/uts-murni" element={<NilaiUTSMurni />} />
            <Route path="nilai/uas" element={<NilaiUAS />} />
            <Route path="nilai/uas-murni" element={<NilaiUASMurni />} />
            <Route path="nilai/her" element={<NilaiHER />} />
            <Route path="nilai/her-murni" element={<NilaiHERmurni />} />
          </Route>

          {/* CATCH ALL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* TOAST */}
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
