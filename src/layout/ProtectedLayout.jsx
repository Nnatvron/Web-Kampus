// src/layout/ProtectedLayout.jsx
import Navbar from "../components/Navbar/Navbar"; // pastikan path benar
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <div className="protected-layout-wrapper">
      <Navbar />
      <main>
        <Outlet /> {/* Ini tempat nested route (Dashboard, Kalender, Jadwal) */}
      </main>
    </div>
  );
}
