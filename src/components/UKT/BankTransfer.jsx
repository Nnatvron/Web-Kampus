// src/components/PaymentMethods/BankTransfer/BankTransfer.jsx
import { useState } from "react";
import "./BankTransfer.css";

function BankTransfer({ onNext, onBack }) {
  const banks = [
    { id: "bca", name: "BCA", account: "123-456-7890", color: "#0033a0" },
    { id: "bni", name: "BNI", account: "987-654-3210", color: "#ffd700" },
    { id: "mandiri", name: "Mandiri", account: "555-666-7777", color: "#0071bc" },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="bank_container">
      <h1 className="bank_title">Pilih Bank</h1>

      <div className="bank_grid">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className={`bank_card ${selected === bank.id ? "active" : ""}`}
            style={{ "--bankColor": bank.color }}
            onClick={() => setSelected(bank.id)}
          >
            <div className="bank_icon" style={{ backgroundColor: bank.color }}>
              {bank.name[0]}
            </div>
            <h2>{bank.name}</h2>
            <p>Rek: {bank.account}</p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="bank_buttons">
        <button className="back_btn" onClick={onBack}>Kembali</button>
        <button
          className="next_btn"
          onClick={onNext}
          disabled={!selected}
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}

export default BankTransfer;