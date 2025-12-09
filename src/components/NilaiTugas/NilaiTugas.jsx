import { useState, useEffect } from "react";
import "./NilaiTugas.css";

export default function NilaiTugas() {
  // === Data User dari localStorage ===
  const [user, setUser] = useState({
    nama: "Nama Mahasiswa",
    nim: "0000000000",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        nama: storedUser.name || storedUser.nama || "Nama Mahasiswa",
        nim: storedUser.nim || "0000000000",
      });
    }
  }, []);

  // === List Mata Kuliah ===
  const mataKuliahList = [
    "Pemrograman Web",
    "Basis Data",
    "Pemrograman Mobile",
    "Jaringan Komputer",
  ];

  // === Data Tugas ===
  const dataTugas = {
    "Pemrograman Web": [
      {
        namaTugas: "Tugas Validasi Form",
        tanggal: "12 Februari 2025",
        deskripsi:
          "Form kurang lengkap pada bagian validasi input. Perbaiki logika kondisi.",
        nilai: 88,
      },
      {
        namaTugas: "Tugas CSS Layout",
        tanggal: "18 Februari 2025",
        deskripsi: "Struktur layout belum responsif sepenuhnya.",
        nilai: 74,
      },
    ],

    "Basis Data": [
      {
        namaTugas: "ERD & Relasi",
        tanggal: "10 Februari 2025",
        deskripsi: "Relasi tabel kurang tepat, perhatikan cardinality.",
        nilai: 92,
      },
    ],

    "Pemrograman Mobile": [
      {
        namaTugas: "Tugas UI Flutter",
        tanggal: "11 Februari 2025",
        deskripsi: "UI sudah bagus, perbaiki animasi agar lebih halus.",
        nilai: 85,
      },
    ],

    "Jaringan Komputer": [
      {
        namaTugas: "Subnetting",
        tanggal: "5 Februari 2025",
        deskripsi: "Perhitungan sudah benar, tapi penjelasan kurang lengkap.",
        nilai: 78,
      },
    ],
  };

  const [selectedMK, setSelectedMK] = useState(mataKuliahList[0]);

  // === Status Warna Nilai ===
  const getStatusClass = (nilai) => {
    if (nilai >= 85) return "nilai-status good";
    if (nilai >= 70) return "nilai-status warning";
    return "nilai-status bad";
  };

  // === Status Text ===
  const getStatusText = (nilai) => {
    if (nilai >= 85) return "Bagus";
    if (nilai >= 70) return "Cukup";
    return "Kurang";
  };

  return (
    <div className="nilaiTugas-wrapper">

      {/* === HEADER USER === */}
      <div className="nilaiTugas-header">
        <p className="nilaiTugas-user-name">{user.nama}</p>
        <p className="nilaiTugas-user-nim">NIM: {user.nim}</p>
      </div>

      {/* === DROPDOWN MATA KULIAH === */}
      <div className="nilaiTugas-filter-box">
        <label>Pilih Mata Kuliah:</label>

        <select
          className="nilaiTugas-select"
          value={selectedMK}
          onChange={(e) => setSelectedMK(e.target.value)}
        >
          {mataKuliahList.map((mk, i) => (
            <option key={i} value={mk}>
              {mk}
            </option>
          ))}
        </select>
      </div>

      {/* === LIST TUGAS === */}
      <div className="nilaiTugas-list">
        {dataTugas[selectedMK].map((tugas, index) => (
          <div className="nilaiTugas-card" key={index}>

            {/* Nama Tugas */}
            <h3 className="nilaiTugas-tugas-title">{tugas.namaTugas}</h3>

            {/* Mata Kuliah */}
            <p className="nilaiTugas-mk">{selectedMK}</p>

            {/* Tanggal */}
            <p className="nilaiTugas-date">
              Tanggal Penilaian: {tugas.tanggal}
            </p>

            {/* Deskripsi */}
            <div className="nilaiTugas-desc">
              <p>{tugas.deskripsi}</p>
            </div>

            {/* NILAI BOX */}
            <div className="nilaiTugas-scoreBox">
              <p className="nilaiTugas-score">{tugas.nilai}</p>

              <span className={getStatusClass(tugas.nilai)}>
                {getStatusText(tugas.nilai)}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
