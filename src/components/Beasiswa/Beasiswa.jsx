import { useState } from "react";
import "./Beasiswa.css";

function Beasiswa() {
  const menuItems = [
    {
      id: "daftar-beasiswa",
      title: "Daftar Beasiswa",
      desc: "Lihat semua beasiswa yang tersedia",
      icon: "ri-trophy-line",
      color: "#4da6ff",
    },
    {
      id: "persyaratan",
      title: "Persyaratan",
      desc: "Cek syarat & ketentuan beasiswa",
      icon: "ri-file-list-3-line",
      color: "#ff7a7a",
    },
    {
      id: "daftar-online",
      title: "Daftar Online",
      desc: "Ajukan beasiswa secara online",
      icon: "ri-send-plane-line",
      color: "#8cff66",
    },
    {
      id: "status-pengajuan",
      title: "Status Pengajuan",
      desc: "Cek status pengajuan beasiswa",
      icon: "ri-bar-chart-line",
      color: "#ffa64d",
    },
  ];

  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item.id);
    // Bisa pakai routing atau modal sesuai item.id
    console.log("Pilih menu Beasiswa:", item.id);
  };

  return (
    <div className="beasiswa_container">
      <h1 className="beasiswa_title">Menu Beasiswa</h1>

      <div className="beasiswa_grid">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`beasiswa_card ${selected === item.id ? "active" : ""}`}
            style={{ "--cardColor": item.color }}
            onClick={() => handleSelect(item)}
          >
            <div className="beasiswa_icon">
              <i className={item.icon}></i>
            </div>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <div className="beasiswa_glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Beasiswa;
