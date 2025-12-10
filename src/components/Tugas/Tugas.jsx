import { useState, useEffect } from "react";
import "./Tugas.css";

function Tugas() {
  const matkulList = ["Matematika", "Fisika", "Kimia", "Bahasa Inggris", "Pemrograman"];
  const [selectedMatkul, setSelectedMatkul] = useState(matkulList[0]);
  const [animatedList, setAnimatedList] = useState([]);

  const tugasData = {
    Matematika: [
      { no: 1, name: "Tugas Aljabar", desc: "Selesaikan soal aljabar", created: "2025-12-01", deadline: "2025-12-08" },
      { no: 2, name: "Tugas Geometri", desc: "Kerjakan soal geometri 1-20", created: "2025-12-03", deadline: "2025-12-10" },
    ],
    Fisika: [
      { no: 1, name: "Tugas Mekanika", desc: "Hitung kecepatan benda", created: "2025-12-02", deadline: "2025-12-09" },
      { no: 2, name: "Tugas Energi", desc: "Analisis energi kinetik", created: "2025-12-05", deadline: "2025-12-12" },
    ],
    Kimia: [
      { no: 1, name: "Tugas Kimia Organik", desc: "Buat diagram reaksi", created: "2025-12-01", deadline: "2025-12-08" },
      { no: 2, name: "Tugas Kimia Anorganik", desc: "Kerjakan soal stoikiometri", created: "2025-12-04", deadline: "2025-12-11" },
    ],
    "Bahasa Inggris": [
      { no: 1, name: "Tugas Grammar", desc: "Perbaiki kalimat", created: "2025-12-01", deadline: "2025-12-06" },
      { no: 2, name: "Tugas Essay", desc: "Buat essay 500 kata", created: "2025-12-03", deadline: "2025-12-10" },
    ],
    Pemrograman: [
      { no: 1, name: "Tugas React", desc: "Buat komponen dashboard", created: "2025-12-02", deadline: "2025-12-09" },
      { no: 2, name: "Tugas Python", desc: "Buat script otomatisasi", created: "2025-12-04", deadline: "2025-12-11" },
    ],
  };

  useEffect(() => {
    setAnimatedList([]);
    const items = tugasData[selectedMatkul] || [];
    items.forEach((item, index) => {
      setTimeout(() => {
        setAnimatedList((prev) => [...prev, item]);
      }, 50 * index);
    });
  }, [selectedMatkul]);

  return (
    <div className="tugas_container">
      <h1 className="tugas_title">Daftar Tugas</h1>

      {/* Tabs Mata Kuliah */}
      <div className="tugas_tabs">
        {matkulList.map((m) => (
          <button
            key={m}
            className={`tugas_tab ${selectedMatkul === m ? "active" : ""}`}
            onClick={() => setSelectedMatkul(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* List Tugas */}
      <div className="tugas_list">
        {animatedList.map((tugas, i) => (
          <div key={i} className="tugas_item fadeInUp">
            <div className="tugas_number">{tugas.no}</div>
            <div className="tugas_info">
              <h2 className="tugas_name">{tugas.name}</h2>
              <p className="tugas_desc">{tugas.desc}</p>
              <p className="tugas_dates">
                Dibuat: {tugas.created} | Deadline: {tugas.deadline}
              </p>
            </div>
            <input type="file" className="tugas_upload" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tugas;
