import { useState, useEffect } from "react";
import "./NilaiHERmurni.css";

export default function NilaiHERmurni() {
  const [selectedMK, setSelectedMK] = useState("Pemrograman Web");
  const [animKey, setAnimKey] = useState(0);
  const [triggerBar, setTriggerBar] = useState(false); // animasi bar
  const [triggerCircle, setTriggerCircle] = useState(false); // 🔥 animasi circle

  const mataKuliah = [
    "Pemrograman Web",
    "Basis Data",
    "Jaringan Komputer",
    "Algoritma",
    "Sistem Operasi",
    "UI/UX",
  ];

  const dataMK = {
    "Pemrograman Web": { nilai: 75, komentar: "Perbaikan bagus, lebih stabil." },
    "Basis Data": { nilai: 60, komentar: "Masih kurang di bagian relasi tabel." },
    "Jaringan Komputer": { nilai: 82, komentar: "Peningkatan signifikan." },
    "Algoritma": { nilai: 55, komentar: "Logika masih perlu diasah." },
    "Sistem Operasi": { nilai: 70, komentar: "Cukup stabil tapi belum maksimal." },
    "UI/UX": { nilai: 88, komentar: "Desain meningkat pesat." },
  };

  const handleChange = (e) => {
    setSelectedMK(e.target.value);
    setAnimKey((prev) => prev + 1);
  };

  // 🔥 trigger animasi bar & circle setiap ganti MK
  useEffect(() => {
    setTriggerBar(false);
    setTriggerCircle(false);

    const t1 = setTimeout(() => setTriggerBar(true), 30);
    const t2 = setTimeout(() => setTriggerCircle(true), 30);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [selectedMK]);

  const score = dataMK[selectedMK].nilai;

  return (
    <div className="herm-wrapper">

      {/* HEADER */}
      <div className="herm-header">
        <div>
          <p className="herm-name">Nama Mahasiswa</p>
          <p className="herm-nim">NIM: 123456789</p>
        </div>

        <div className="herm-select-area">
          <label>Pilih Mata Kuliah</label>

          <div className="herm-select-wrap">
            <select className="herm-select" value={selectedMK} onChange={handleChange}>
              {mataKuliah.map((mk) => (
                <option key={mk} value={mk}>
                  {mk}
                </option>
              ))}
            </select>
            <span className="herm-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="herm-content fade-her" key={animKey}>

        {/* SCORE CIRCLE */}
        <div className="herm-score-card">
          <div className="herm-circle">
            <svg width="150" height="150">
              <circle cx="75" cy="75" r="60" stroke="#ffffff1a" strokeWidth="12" fill="none" />

              <circle
                cx="75"
                cy="75"
                r="60"
                stroke="url(#herGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                className={triggerCircle ? "anim-circle-herm" : ""}
                style={{
                  strokeDasharray: `${2 * Math.PI * 60}px`,
                  strokeDashoffset: `${(1 - score / 100) * 2 * Math.PI * 60}px`,
                  "--circle-offset": `${(1 - score / 100) * 2 * Math.PI * 60}px`,
                }}
              />

              <defs>
                <linearGradient id="herGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b16cff" />
                  <stop offset="100%" stopColor="#6db3ff" />
                </linearGradient>
              </defs>
            </svg>

            <p className="herm-score">{score}</p>
          </div>

          <p className="herm-mk">{selectedMK}</p>
          <p className="herm-grade">
            {score >= 85 ? "Sangat Baik" :
             score >= 70 ? "Baik" :
             score >= 60 ? "Cukup" : "Kurang"}
          </p>
        </div>

        {/* DETAIL SECTION */}
        <div className="herm-details">

          <div className="herm-card card-her">
            <h3>Analisis Perbaikan</h3>
            <p>{dataMK[selectedMK].komentar}</p>
          </div>

          <div className="herm-card card-her">
            <h3>Progress HER</h3>

            <div className="herm-bar">
              <div
                className={`herm-bar-fill ${triggerBar ? "anim-bar-herm" : ""}`}
                style={{ width: `${score}%` }}
                key={animKey}
              ></div>
            </div>
          </div>

          <div className="herm-card card-her">
            <h3>Statistik</h3>

            <div className="herm-stat-grid">
              <div className="herm-stat">
                <p className="label">Nilai Sebelumnya</p>
                <p className="value">{Math.max(score - 10, 40)}</p>
              </div>

              <div className="herm-stat">
                <p className="label">Kenaikan</p>
                <p className="value">+{Math.floor(score - (score - 10))}%</p>
              </div>

              <div className="herm-stat">
                <p className="label">Kategori</p>
                <p className="value">
                  {score >= 80 ? "Improved" :
                   score >= 60 ? "Normal" : "Low"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
