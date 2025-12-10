import { useState, useEffect } from "react";
import "./VirtualAccount.css";

function VirtualAccount({ onNext, onBack }) {
  const [va, setVa] = useState("");

  useEffect(() => {
    const prefix = ["112", "887", "009", "888"][Math.floor(Math.random() * 4)];
    const number = Math.floor(10000000 + Math.random() * 90000000);
    setVa(prefix + number);
  }, []);

  return (
    <div className="va_container">
      <h1>Virtual Account</h1>

      <div className="va_box">{va}</div>

      <p>Silakan transfer ke nomor VA di atas.</p>

      <button className="va_next" onClick={onNext}>Saya Sudah Transfer</button>
      <button className="va_back" onClick={onBack}>Kembali</button>
    </div>
  );
}

export default VirtualAccount;
