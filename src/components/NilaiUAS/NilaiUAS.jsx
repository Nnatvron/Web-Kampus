import { useState, useEffect } from "react";
import "./NilaiUAS.css";

export default function NilaiUAS() {
  const [selectedMK, setSelectedMK] = useState("Pemrograman Web");
  const [animateKey, setAnimateKey] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  const mataKuliah = [
    "Pemrograman Web",
    "Basis Data",
    "Jaringan Komputer",
    "Algoritma",
    "Sistem Operasi",
    "UI/UX",
  ];

  const dataMK = {
    "Pemrograman Web": { nilai: 88, komentar: "Sangat baik, konsisten selama UAS." },
    "Basis Data": { nilai: 72, komentar: "Perlu peningkatan pada query kompleks." },
    "Jaringan Komputer": { nilai: 90, komentar: "Pemahaman protokol sangat bagus." },
    "Algoritma": { nilai: 65, komentar: "Kurang di soal optimasi." },
    "Sistem Operasi": { nilai: 78, komentar: "Baik, namun kurang stabil di beberapa topik." },
    "UI/UX": { nilai: 95, komentar: "Desain sangat rapi dan logis." },
  };

  const score = dataMK[selectedMK].nilai;

  // 🔥 Animasi score → bergerak dari 0 ke score tiap ganti MK
  useEffect(() => {
    setAnimatedScore(0);
    setTimeout(() => {
      setAnimatedScore(score);
    }, 150);
  }, [selectedMK]);

  const handleChange = (e) => {
    setSelectedMK(e.target.value);
    setAnimateKey((prev) => prev + 1);
  };

  return (
    <div className="nuas-wrapper">

      {/* HEADER */}
      <div className="nuas-header">
        <div>
          <p className="nuas-name">Nama Mahasiswa</p>
          <p className="nuas-nim">NIM: 123456789</p>
        </div>

        <div className="nuas-meta">
          <label>Pilih Mata Kuliah</label>

          <div className="nuas-select-wrap">
            <select value={selectedMK} onChange={handleChange} className="nuas-select">
              {mataKuliah.map((mk) => (
                <option key={mk} value={mk}>{mk}</option>
              ))}
            </select>
            <span className="nuas-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="nuas-content fade-slide" key={animateKey}>

        {/* SCORE CARD */}
        <div className="nuas-score-box">
          <div className="nuas-score-circle">
            <svg width="130" height="130">
              {/* BACKGROUND RING */}
              <circle
                cx="65"
                cy="65"
                r="55"
                stroke="#ffffff22"
                strokeWidth="10"
                fill="none"
              />

              {/* ANIMATED RING */}
              <circle
                cx="65"
                cy="65"
                r="55"
                stroke="url(#grad)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 55}px`,
                  strokeDashoffset: `${(1 - animatedScore / 100) * 2 * Math.PI * 55}px`,
                  transition: "stroke-dashoffset 1.2s ease",
                }}
              />

              {/* GRADIENT */}
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7b5cff" />
                  <stop offset="100%" stopColor="#4da0ff" />
                </linearGradient>
              </defs>
            </svg>

            <p className="nuas-score">{animatedScore}</p>
          </div>

          <p className="nuas-mk">{selectedMK}</p>

          <p className="nuas-grade">
            {score >= 85 ? "Sangat Baik" :
             score >= 70 ? "Baik" :
             score >= 60 ? "Cukup" :
             "Kurang"}
          </p>
        </div>

        {/* DETAIL SECTION */}
        <div className="nuas-details">

          {/* CARD 1 */}
          <div className="nuas-card card-anim">
            <h3>Analisis Nilai</h3>
            <p className="nuas-comment">{dataMK[selectedMK].komentar}</p>
          </div>

          {/* CARD 2 */}
          <div className="nuas-card card-anim">
            <h3>Performance Bar</h3>

            <div className="nuas-progress">
              <div
                className="nuas-progress-fill"
                style={{
                  width: `${animatedScore}%`,
                  transition: "width 1.2s ease",
                }}
              ></div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="nuas-card card-anim">
            <h3>Statistik</h3>

            <div className="nuas-stat-grid">

              <div className="nuas-stat">
                <p className="nuas-stat-label">Rata-rata Kelas</p>
                <p className="nuas-stat-value">{Math.round((score + 75) / 2)}%</p>
              </div>

              <div className="nuas-stat">
                <p className="nuas-stat-label">Ranking</p>
                <p className="nuas-stat-value">{score > 85 ? "Top 5" : "Top 15"}</p>
              </div>

              <div className="nuas-stat">
                <p className="nuas-stat-label">Kategori</p>
                <p className="nuas-stat-value">{score >= 80 ? "High" : "Medium"}</p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
