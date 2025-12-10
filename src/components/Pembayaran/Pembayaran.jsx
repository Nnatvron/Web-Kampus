import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import "./Pembayaran.css";

function PaymentMenu() {
  const navigate = useNavigate(); // <-- init navigate
  const paymentTypes = [
    {
      id: "ukt",
      title: "UKT",
      desc: "Uang Kuliah Tunggal Semester",
      icon: "ri-bank-card-line",
      color: "#4da6ff"
    },
    {
      id: "seminar",
      title: "Seminar",
      desc: "Biaya seminar & workshop",
      icon: "ri-presentation-line",
      color: "#ff7a7a"
    },
    {
      id: "wisuda",
      title: "Wisuda",
      desc: "Pembayaran wisuda & toga",
      icon: "ri-graduation-cap-line",
      color: "#8cff66"
    },
    {
      id: "praktikum",
      title: "Praktikum",
      desc: "Biaya modul & lab",
      icon: "ri-flask-line",
      color: "#ffa64d"
    },
    {
      id: "lainnya",
      title: "Lainnya",
      desc: "Pembayaran tambahan",
      icon: "ri-file-list-3-line",
      color: "#d9b3ff"
    }
  ];

  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item.id);

    // Jika klik UKT → navigate ke halaman UKT
    if (item.id === "ukt") {
      navigate("/pembayaran/ukt");
      return;
    }

    // Untuk jenis lain, bisa tambahin logika navigasi berbeda
    // misal: navigate(`/pembayaran/${item.id}`);
  };

  return (
    <div className="paymentMenu_container">
      <h1 className="paymentMenu_title">Pilih Jenis Pembayaran</h1>

      <div className="paymentMenu_grid">
        {paymentTypes.map((item) => (
          <div
            key={item.id}
            className={`paymentMenu_card ${selected === item.id ? "active" : ""}`}
            style={{ "--cardColor": item.color }}
            onClick={() => handleSelect(item)}
          >
            {/* ICON */}
            <div className="paymentMenu_iconWrapper">
              <i className={item.icon}></i>
            </div>

            {/* TEXT */}
            <h2 className="paymentMenu_cardTitle">{item.title}</h2>
            <p className="paymentMenu_cardDesc">{item.desc}</p>

            {/* GLOW */}
            <div className="paymentMenu_glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMenu;
