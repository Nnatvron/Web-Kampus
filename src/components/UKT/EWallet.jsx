// src/components/PaymentMethods/EWallet/EWallet.jsx
import { useState } from "react";
import "./EWallet.css";

function EWallet({ onNext, onBack }) {
  const wallets = [
    { id: "gopay", name: "Gopay", color: "#00a1f1" },
    { id: "ovo", name: "OVO", color: "#8c43ff" },
    { id: "dana", name: "Dana", color: "#00bfff" },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="ewallet_container">
      <h1 className="ewallet_title">Pilih Metode E-Wallet</h1>

      <div className="ewallet_grid">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className={`ewallet_card ${selected === wallet.id ? "active" : ""}`}
            style={{ "--walletColor": wallet.color }}
            onClick={() => setSelected(wallet.id)}
          >
            <div className="ewallet_icon" style={{ backgroundColor: wallet.color }}>
              {wallet.name[0]}
            </div>
            <h2>{wallet.name}</h2>
          </div>
        ))}
      </div>

      {/* Tombol Kembali */}
      <div className="ewallet_buttons">
        <button className="ewallet_back" onClick={onBack}>
          Kembali
        </button>
        {/* Tombol Lanjut jika ingin */}
        {selected && (
          <button className="ewallet_next" onClick={onNext}>
            Lanjut
          </button>
        )}
      </div>
    </div>
  );
}

export default EWallet;
