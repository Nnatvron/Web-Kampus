// src/layout/ProtectedLayout.jsx
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
