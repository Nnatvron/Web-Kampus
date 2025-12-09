import { useState, useEffect } from "react";
import "./NilaiUASMurni.css";

export default function NilaiUASMurni() {
  const [selectedMK, setSelectedMK] = useState("Pemrograman Web");
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const mataKuliah = [
    "Pemrograman Web",
    "Basis Data",
    "Jaringan Komputer",
    "Algoritma",
    "Sistem Operasi",
    "UI/UX",
  ];

  const dataMK = {
    "Pemrograman Web": { nilai: 90 },
    "Basis Data": { nilai: 78 },
    "Jaringan Komputer": { nilai: 88 },
    "Algoritma": { nilai: 70 },
    "Sistem Operasi": { nilai: 82 },
    "UI/UX": { nilai: 95 },
  };

  const score = dataMK[selectedMK].nilai;

  // ANIMASI NILAI
  useEffect(() => {
    setAnimatedScore(0);
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [selectedMK]);

  const handleMKChange = (e) => {
    setSelectedMK(e.target.value);
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div className="nuasm-wrapper">

      {/* HEADER */}
      <div className="nuasm-header">
        <div>
          <p className="nuasm-name">Nama Mahasiswa</p>
          <p className="nuasm-nim">NIM : 123456789</p>
        </div>

        <div className="nuasm-select-section">
          <label>Pilih Mata Kuliah</label>
          <div className="nuasm-select-wrap">
            <select className="nuasm-select" value={selectedMK} onChange={handleMKChange}>
              {mataKuliah.map((mk) => (
                <option key={mk} value={mk}>{mk}</option>
              ))}
            </select>
            <span className="nuasm-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="nuasm-content fadeSlide" key={animKey}>

        {/* SCORE CARD */}
        <div className="nuasm-score-box">
          <div className="nuasm-circle-wrap">
            <svg width="130" height="130">
              <circle cx="65" cy="65" r="55" stroke="#ffffff25" strokeWidth="10" fill="none" />

              <circle
                cx="65"
                cy="65"
                r="55"
                stroke="url(#gradUASM)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 55}px`,
                  strokeDashoffset: `${(1 - animatedScore / 100) * 2 * Math.PI * 55}px`,
                  transition: "stroke-dashoffset 1.2s ease",
                }}
              />

              <defs>
                <linearGradient id="gradUASM" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff7ce5" />
                  <stop offset="100%" stopColor="#b895ff" />
                </linearGradient>
              </defs>
            </svg>

            <p className="nuasm-score">{animatedScore}</p>
          </div>

          <p className="nuasm-mk">{selectedMK}</p>

          <p className="nuasm-grade">
            {score >= 85 ? "Sangat Baik" :
             score >= 70 ? "Baik" :
             score >= 60 ? "Cukup" :
             "Kurang"}
          </p>
        </div>

        {/* RIGHT DETAIL */}
        <div className="nuasm-right">

          <div className="nuasm-card">
            <h3>Performance Bar</h3>
            <div className="nuasm-progress">
              <div
                className="nuasm-progress-fill"
                style={{
                  width: `${animatedScore}%`,
                  transition: "width 1.2s ease",
                }}
              ></div>
            </div>
          </div>

          <div className="nuasm-card">
            <h3>Statistik</h3>
            <div className="nuasm-stat-grid">

              <div className="nuasm-stat">
                <p className="nuasm-stat-label">Rata-rata Kelas</p>
                <p className="nuasm-stat-value">{Math.round((score + 75) / 2)}%</p>
              </div>

              <div className="nuasm-stat">
                <p className="nuasm-stat-label">Ranking</p>
                <p className="nuasm-stat-value">
                  {score >= 85 ? "Top 5" : "Top 15"}
                </p>
              </div>

              <div className="nuasm-stat">
                <p className="nuasm-stat-label">Kategori</p>
                <p className="nuasm-stat-value">
                  {score >= 80 ? "High" : "Medium"}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
