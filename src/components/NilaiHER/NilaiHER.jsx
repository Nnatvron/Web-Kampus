import { useState, useEffect } from "react";
import "./NilaiHER.css";

export default function NilaiHER() {
  const [selectedMK, setSelectedMK] = useState("Pemrograman Web");
  const [animatedScore, setAnimatedScore] = useState(0);
  const [keyAnim, setKeyAnim] = useState(0);

  const mataKuliah = [
    "Pemrograman Web",
    "Basis Data",
    "Jaringan Komputer",
    "Algoritma",
    "Sistem Operasi",
    "UI/UX",
  ];

  const dataMK = {
    "Pemrograman Web": { nilai: 82, evaluasi: "Perbaikan tepat sasaran." },
    "Basis Data": { nilai: 68, evaluasi: "Masih kurang di query join." },
    "Jaringan Komputer": { nilai: 88, evaluasi: "Pemahaman meningkat pesat." },
    "Algoritma": { nilai: 75, evaluasi: "Struktur logika sudah baik." },
    "Sistem Operasi": { nilai: 79, evaluasi: "Tingkatkan pemahaman kernel." },
    "UI/UX": { nilai: 94, evaluasi: "Sangat baik, desain matang." },
  };

  const score = dataMK[selectedMK].nilai;

  // ANIMASI SCORE
  useEffect(() => {
    setAnimatedScore(0);
    const t = setTimeout(() => setAnimatedScore(score), 80);
    return () => clearTimeout(t);
  }, [selectedMK]);

  const handleCHG = (e) => {
    setSelectedMK(e.target.value);
    setKeyAnim((prev) => prev + 1);
  };

  return (
    <div className="her-wrapper">

      {/* HEADER */}
      <div className="her-header">
        <div>
          <p className="her-name">Nama Mahasiswa</p>
          <p className="her-nim">NIM : 123456789</p>
        </div>

        <div className="her-select-section">
          <label>Pilih Mata Kuliah</label>

          <div className="her-select-wrap">
            <select value={selectedMK} onChange={handleCHG} className="her-select">
              {mataKuliah.map((mk) => (
                <option key={mk} value={mk}>{mk}</option>
              ))}
            </select>
            <span className="her-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="her-content fadeSlide" key={keyAnim}>

        {/* LEFT: SCORE BOX */}
        <div className="her-score-card">
          <div className="her-circle">
            <svg width="140" height="140">
              <circle
                cx="70"
                cy="70"
                r="58"
                stroke="#ffffff18"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="70"
                cy="70"
                r="58"
                stroke="url(#gradHER)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 58}px`,
                  strokeDashoffset: `${(1 - animatedScore / 100) * 2 * Math.PI * 58}px`,
                  transition: "stroke-dashoffset 1.2s ease",
                }}
              />

              <defs>
                <linearGradient id="gradHER" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6a9bff" />
                  <stop offset="100%" stopColor="#b878ff" />
                </linearGradient>
              </defs>
            </svg>

            <p className="her-score">{animatedScore}</p>
          </div>

          <p className="her-mk">{selectedMK}</p>

          <p className="her-grade">
            {score >= 85 ? "Sangat Baik" :
             score >= 70 ? "Baik" :
             score >= 60 ? "Cukup" : "Kurang"}
          </p>
        </div>

        {/* RIGHT: EVALUATION */}
        <div className="her-detail">

          <div className="her-card">
            <h3>Evaluasi Remedial</h3>
            <p className="her-comment">{dataMK[selectedMK].evaluasi}</p>
          </div>

          <div className="her-card">
            <h3>Peningkatan</h3>
            <div className="her-progress">
              <div
                className="her-progress-fill"
                style={{
                  width: `${animatedScore}%`,
                  transition: "width 1.2s ease",
                }}
              ></div>
            </div>
          </div>

          <div className="her-card">
            <h3>Riwayat Perbaikan</h3>

            <div className="her-timeline">
              <div className="her-timeline-item">
                <span className="dot"></span>
                <p>Review materi ulang</p>
              </div>

              <div className="her-timeline-item">
                <span className="dot"></span>
                <p>Perbaikan tugas</p>
              </div>

              <div className="her-timeline-item">
                <span className="dot"></span>
                <p>Evaluasi akhir</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
