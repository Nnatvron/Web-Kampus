import "./DetailTagihan.css";

function DetailTagihan({ type, onNext, onBack }) {
  const detail = {
    ukt: {
      title: "UKT Semester Genap",
      items: [
        { name: "Biaya Kuliah", price: 2500000 },
        { name: "Biaya Administrasi", price: 150000 },
        { name: "Kontribusi Fasilitas", price: 120000 },
      ]
    }
  };

  const tagihan = detail[type];
  const total = tagihan.items.reduce((a, b) => a + b.price, 0);

  return (
    <div className="tagihan_container">
      <h1 className="tagihan_title">{tagihan.title}</h1>

      <div className="tagihan_card">
        {tagihan.items.map((item, i) => (
          <div key={i} className="tagihan_row">
            <span>{item.name}</span>
            <span className="tagihan_price">Rp {item.price.toLocaleString()}</span>
          </div>
        ))}

        <div className="tagihan_totalRow">
          <strong>Total Pembayaran</strong>
          <strong>Rp {total.toLocaleString()}</strong>
        </div>
      </div>

      <div className="tagihan_buttons">
        {/* Tombol Lanjut Pembayaran */}
        <button className="tagihan_button" onClick={onNext}>
          Lanjut Pembayaran
        </button>

        {/* Tombol Kembali di bawah */}
        {onBack && (
          <button className="tagihan_back" onClick={onBack}>
            Kembali
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailTagihan;
