import { useState, useEffect } from "react";
import "./Ujian.css";

function Ujian() {
  const matkulList = ["Matematika", "Fisika", "Kimia", "Bahasa Inggris", "Pemrograman"];
  const [selectedMatkul, setSelectedMatkul] = useState(matkulList[0]);
  const [animatedList, setAnimatedList] = useState([]);

  const ujianData = {
    Matematika: [
      { no: 1, name: "UTS", date: "2025-12-15", time: "09:00 - 11:00", status: "Belum" },
      { no: 2, name: "UAS", date: "2025-12-30", time: "13:00 - 15:00", status: "Belum" },
    ],
    Fisika: [
      { no: 1, name: "UTS", date: "2025-12-17", time: "10:00 - 12:00", status: "Belum" },
      { no: 2, name: "Quiz", date: "2025-12-22", time: "08:00 - 09:00", status: "Belum" },
    ],
    Kimia: [
      { no: 1, name: "UTS", date: "2025-12-18", time: "13:00 - 15:00", status: "Belum" },
      { no: 2, name: "UAS", date: "2025-12-31", time: "09:00 - 11:00", status: "Belum" },
    ],
    "Bahasa Inggris": [
      { no: 1, name: "UTS", date: "2025-12-16", time: "10:00 - 12:00", status: "Belum" },
      { no: 2, name: "Quiz", date: "2025-12-23", time: "14:00 - 15:00", status: "Belum" },
      { no: 3, name: "UAS", date: "2025-12-30", time: "09:00 - 11:00", status: "Belum" },
    ],
    Pemrograman: [
      { no: 1, name: "UTS", date: "2025-12-19", time: "09:00 - 11:00", status: "Belum" },
      { no: 2, name: "Quiz", date: "2025-12-24", time: "10:00 - 11:00", status: "Belum" },
      { no: 3, name: "UAS", date: "2025-12-31", time: "13:00 - 15:00", status: "Belum" },
    ],
  };

  // Animasi fade-in ketika tab berubah
  useEffect(() => {
    setAnimatedList([]);
    const items = ujianData[selectedMatkul] || [];
    items.forEach((item, index) => {
      setTimeout(() => {
        setAnimatedList((prev) => [...prev, item]);
      }, 50 * index);
    });
  }, [selectedMatkul]);

  return (
    <div className="ujian_container">
      <h1 className="ujian_title">Daftar Ujian</h1>

      {/* Tabs Mata Kuliah */}
      <div className="ujian_tabs">
        {matkulList.map((m) => (
          <button
            key={m}
            className={`ujian_tab ${selectedMatkul === m ? "active" : ""}`}
            onClick={() => setSelectedMatkul(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* List Ujian */}
      <div className="ujian_list">
        {animatedList.map((ujian, i) => (
          <div key={i} className="ujian_item fadeInUp">
            <div className="ujian_number">{ujian.no}</div>
            <div className="ujian_info">
              <h2 className="ujian_name">{ujian.name}</h2>
              <p className="ujian_datetime">
                {ujian.date} | {ujian.time}
              </p>
              <span className={`ujian_status ${ujian.status.toLowerCase()}`}>
                {ujian.status}
              </span>
            </div>
            <button className="ujian_detail">Lihat Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ujian;
