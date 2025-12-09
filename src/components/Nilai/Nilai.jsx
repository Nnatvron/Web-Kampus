// components/Nilai/Nilai.jsx
import "./Nilai.css";
import { useNavigate } from "react-router-dom";

export default function Nilai() {
  const navigate = useNavigate();

  const categories = [
    { name: "Nilai Tugas", path: "/nilai/tugas" },
    { name: "Nilai UTS", path: "/nilai/uts" },
    { name: "Nilai UTS Murni", path: "/nilai/uts-murni" },
    { name: "Nilai UAS", path: "/nilai/uas" },
    { name: "Nilai UAS Murni", path: "/nilai/uas-murni" },
    { name: "Nilai HER", path: "/nilai/her" },
    { name: "Nilai HER Murni", path: "/nilai/her-murni" },
  ];

  return (
    <div className="nilai-wrapper">
      <h2 className="nilai-title">Daftar Nilai</h2>

      <div className="nilai-grid">
        {categories.map((item, index) => (
          <div
            className="nilai-card"
            key={index}
            onClick={() => navigate(item.path)}
          >
            <p className="nilai-label">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
