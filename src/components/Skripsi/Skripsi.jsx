import { useState } from "react";
import "./Skripsi.css";

function Skripsi() {
  const menuItems = [
    {
      id: "daftar-topik",
      title: "Daftar Topik",
      desc: "Lihat daftar topik skripsi tersedia",
      icon: "ri-file-list-3-line",
      color: "#4da6ff"
    },
    {
      id: "pembimbing",
      title: "Pilih Pembimbing",
      desc: "Pilih dosen pembimbing skripsi",
      icon: "ri-user-line",
      color: "#ff7a7a"
    },
    {
      id: "upload-draft",
      title: "Upload Draft",
      desc: "Unggah draft skripsi Anda",
      icon: "ri-upload-line",
      color: "#8cff66"
    },
    {
      id: "status",
      title: "Status Skripsi",
      desc: "Cek status progress skripsi",
      icon: "ri-bar-chart-line",
      color: "#ffa64d"
    },
  ];

  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item.id);
    // bisa pakai routing ke subpage Skripsi sesuai item.id
    console.log("Pilih menu:", item.id);
  };

  return (
    <div className="skripsi_container">
      <h1 className="skripsi_title">Menu Skripsi</h1>

      <div className="skripsi_grid">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`skripsi_card ${selected === item.id ? "active" : ""}`}
            style={{ "--cardColor": item.color }}
            onClick={() => handleSelect(item)}
          >
            <div className="skripsi_icon">
              <i className={item.icon}></i>
            </div>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <div className="skripsi_glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skripsi;
