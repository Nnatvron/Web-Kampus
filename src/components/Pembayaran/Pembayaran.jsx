import { useState } from "react";
import "./Pembayaran.css";

function PaymentMenu({ onSelect }) {
  const paymentTypes = [
    { id: "ukt", title: "UKT", desc: "Uang Kuliah Tunggal Semester", color: "#4da6ff" },
    { id: "seminar", title: "Seminar", desc: "Biaya seminar & workshop", color: "#ff7a7a" },
    { id: "wisuda", title: "Wisuda", desc: "Pembayaran wisuda & toga", color: "#8cff66" },
    { id: "praktikum", title: "Praktikum", desc: "Biaya modul & lab", color: "#ffa64d" },
    { id: "lainnya", title: "Lainnya", desc: "Pembayaran tambahan", color: "#d9b3ff" },
  ];

  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item.id);
    setTimeout(() => onSelect && onSelect(item.id), 300);
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
            <div className="paymentMenu_icon" style={{ borderColor: item.color }} />

            <h2>{item.title}</h2>
            <p>{item.desc}</p>

            <div className="paymentMenu_glow" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMenu;
