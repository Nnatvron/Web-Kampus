import { useState } from "react";
import "./NilaiUTSMurni.css";

export default function NilaiUTSMurni() {
  const mataKuliahList = [
    "Pemrograman Web",
    "Algoritma & Struktur Data",
    "Basis Data",
    "Sistem Operasi",
    "Matematika Diskrit"
  ];

  const nilaiData = {
    "Pemrograman Web": {
      utsMurni: 88,
      komentar: "Pemahaman kamu terhadap konsep frontend dan backend sudah sangat baik.",
    },
    "Algoritma & Struktur Data": {
      utsMurni: 72,
      komentar: "Struktur data sudah cukup paham, tapi latihan rekursi perlu ditingkatkan.",
    },
    "Basis Data": {
      utsMurni: 81,
      komentar: "ERD dan normalisasi sudah bagus, query SQL cukup rapi.",
    },
    "Sistem Operasi": {
      utsMurni: 67,
      komentar: "Pemahaman thread & scheduling masih perlu pendalaman.",
    },
    "Matematika Diskrit": {
      utsMurni: 90,
      komentar: "Kamu sangat kuat di logika matematika dan pembuktian.",
    },
  };

  const [selectedMK, setSelectedMK] = useState("Pemrograman Web");

  // trigger animasi
  const [animateKey, setAnimateKey] = useState(0);

  const handleChange = (e) => {
    setSelectedMK(e.target.value);

    // ganti key supaya animasi aktif lagi
    setAnimateKey((prev) => prev + 1);
  };

  const utsValue = nilaiData[selectedMK].utsMurni;
  const komentarValue = nilaiData[selectedMK].komentar;

  return (
    <div className="nuts-wrapper">

      {/* HEADER */}
      <div className="nuts-header">
        <div>
          <h2 className="nuts-name">Nama Mahasiswa</h2>
          <p className="nuts-nim">NIM: 202300123</p>
        </div>

        <div className="nuts-meta">
          <label>Pilih Mata Kuliah</label>

          <div className="nuts-select-wrap">
            <select
              className="nuts-select"
              value={selectedMK}
              onChange={handleChange}
            >
              {mataKuliahList.map((mk, i) => (
                <option key={i} value={mk}>
                  {mk}
                </option>
              ))}
            </select>

            <span className="nuts-select-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="nuts-main">

        {/* RING NILAI */}
        <div key={animateKey + "-ring"} className="nuts-ring-card fadeSlide">
          <div className="nuts-ring">
            <svg width="120" height="120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#333"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#ff4444"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${utsValue * 3.14}px`}
                strokeDashoffset="0"
                strokeLinecap="round"
                className="nuts-ring-animate"
              />
            </svg>
          </div>

          <div className="nuts-small-meta">
            <div className="nuts-score-big">{utsValue}</div>
            <div className="nuts-grade">UTS Murni</div>
          </div>
        </div>

        {/* CARD KOMENTAR */}
        <div key={animateKey + "-card"} className="nuts-card fadeSlide">
          <div className="nuts-card-head">
            <h3>Analisis Nilai</h3>
            <span className="nuts-tag">UTS Murni</span>
          </div>

          <p className="nuts-comment-title">Komentar Dosen:</p>
          <p className="nuts-comment">{komentarValue}</p>
        </div>

      </div>

    </div>
  );
}
