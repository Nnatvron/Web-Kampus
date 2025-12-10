import { useEffect, useState } from "react";
import "./PaymentStatus.css";

function PaymentStatus() {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    setTimeout(() => setStatus("processing"), 3000);
    setTimeout(() => setStatus("success"), 6000);
  }, []);

  return (
    <div className="status_container">
      {status === "pending" && <h1>Menunggu Pembayaran...</h1>}
      {status === "processing" && <h1>Memproses Pembayaran...</h1>}
      {status === "success" && <h1>Pembayaran Berhasil! 🎉</h1>}
    </div>
  );
}

export default PaymentStatus;
