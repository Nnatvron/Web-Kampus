import { useEffect, useState } from "react";
import QRCode from "qrcode";

import "./QRIS.css";

function QRIS({ onNext, onBack }) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const generate = async () => {
      const text = "QRIS-UKT#" + Math.random().toString(36).slice(2);
      const q = await QRCode.toDataURL(text);
      setQr(q);
    };
    generate();
  }, []);

  return (
    <div className="qris_container">
      <h1>Scan QRIS</h1>
      <img src={qr} alt="QRIS" className="qris_image" />

      <button className="qris_next" onClick={onNext}>Saya Sudah Bayar</button>
      <button className="qris_back" onClick={onBack}>Kembali</button>
    </div>
  );
}

export default QRIS;
