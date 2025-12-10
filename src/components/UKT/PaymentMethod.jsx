import "./PaymentMethod.css";

function PaymentMethod({ onSelect, onBack }) {
  const methods = [
    { id: "qris", title: "QRIS", desc: "Scan QR untuk bayar", icon: "ri-barcode-line", color: "#4da6ff" },
    { id: "va", title: "Virtual Account", desc: "Bayar via bank", icon: "ri-bank-line", color: "#ff7a7a" },
    { id: "ewallet", title: "E-Wallet", desc: "Bayar pakai e-wallet", icon: "ri-wallet-line", color: "#8cff66" },
    { id: "bank", title: "Transfer Bank", desc: "Bayar via transfer bank", icon: "ri-bank-card-line", color: "#ffa64d" },
  ];

  const handleSelect = (id) => {
    onSelect && onSelect(id);
  };

  return (
    <div className="pm_container">
      <h1 className="pm_title">Pilih Metode Pembayaran</h1>

      <div className="pm_grid">
        {methods.map((m) => (
          <div
            key={m.id}
            className="pm_card"
            style={{ "--cardColor": m.color }}
            onClick={() => handleSelect(m.id)}
          >
            {/* ICON */}
            <div className="pm_icon">
              <i className={m.icon}></i>
            </div>

            <h2 className="pm_cardTitle">{m.title}</h2>
            <p className="pm_cardDesc">{m.desc}</p>
          </div>
        ))}
      </div>

      <button className="pm_backBtn" onClick={onBack}>Kembali</button>
    </div>
  );
}

export default PaymentMethod;
