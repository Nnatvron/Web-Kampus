import { useState, useEffect, useRef, useContext } from "react";
import "./NilaiUTS.css";
import { AuthContext } from "../../context/AuthContext"; // pakai kalau ada

/**
 * Props:
 * - fetchUrl (string) optional -> jika dikirim, komponen akan fetch data dari API
 *
 * Note for Redux:
 * - Kalau mau pakai Redux, import useSelector/useDispatch dari react-redux
 *   lalu ambil data UTS dari store. Contoh ada di komentar di bawah.
 */

export default function NilaiUTS({ fetchUrl }) {
  // ambil user dari AuthContext kalau tersedia (lebih aman daripada localStorage)
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    nama: "Nama Mahasiswa",
    nim: "0000000000",
  });

  // state untuk data UTS (bisa diisi dari API)
  const [dataUTS, setDataUTS] = useState({
    "Pemrograman Web": {
      nilai: 82,
      tanggal: "10 Maret 2025",
      komentar: "Kinerja bagus. Perbaiki dokumentasi fungsi.",
    },
    "Basis Data": {
      nilai: 74,
      tanggal: "12 Maret 2025",
      komentar: "Query sudah benar, optimalkan index.",
    },
    "Jaringan Komputer": {
      nilai: 65,
      tanggal: "08 Maret 2025",
      komentar: "Beberapa konfigurasi belum tepat, perbaiki topologi.",
    },
    "Pemrograman Mobile": {
      nilai: 91,
      tanggal: "15 Maret 2025",
      komentar: "Sangat rapi. Tambahkan komentar di kode.",
    },
  });

  // optional: contoh cara ambil data dari Redux ( tinggal aktifkan )
  /*
  import { useSelector, useDispatch } from 'react-redux';
  const utsFromStore = useSelector(state => state.nilai.uts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (utsFromStore) setDataUTS(utsFromStore);
  }, [utsFromStore]);
  */

  // Ambil user dari context atau localStorage
  useEffect(() => {
    if (auth && auth.user) {
      setUser({
        nama: auth.user.name || auth.user.nama || "Nama Mahasiswa",
        nim: auth.user.nim || "0000000000",
      });
      return;
    }

    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setUser({
        nama: stored.name || stored.nama || "Nama Mahasiswa",
        nim: stored.nim || "0000000000",
      });
    }
  }, [auth]);

  // jika fetchUrl dikirimkan, fetch data dari API (struktur response harus sesuai)
  useEffect(() => {
    if (!fetchUrl) return;

    let mounted = true;
    (async () => {
      try {
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Fetch gagal");
        const json = await res.json();
        // contoh: ekspektasi format { "Pemrograman Web": { nilai, tanggal, komentar }, ... }
        if (mounted && typeof json === "object") {
          setDataUTS(json);
        }
      } catch (err) {
        console.warn("NilaiUTS: gagal fetch data ->", err);
      }
    })();

    return () => (mounted = false);
  }, [fetchUrl]);

  const mataKuliahList = Object.keys(dataUTS);
  const [selectedMK, setSelectedMK] = useState(mataKuliahList[0] || "");
  // animKey dipakai untuk triggering CSS animation (fade+slide) saat berubah
  const [animKey, setAnimKey] = useState(0);
  const prevMK = useRef(selectedMK);

  useEffect(() => {
    if (selectedMK !== prevMK.current) {
      // naikkan key untuk memicu transition class (dipakai di elemen detail)
      setAnimKey((k) => k + 1);
      prevMK.current = selectedMK;
    }
  }, [selectedMK]);

  // current data
  const current = dataUTS[selectedMK] || { nilai: 0, tanggal: "-", komentar: "" };
  const nilai = current.nilai || 0;

  // grade
  const getGrade = (n) => {
    if (n >= 85) return "A";
    if (n >= 70) return "B";
    if (n >= 60) return "C";
    return "D";
  };

  // ring calculations
  const percentage = Math.max(0, Math.min(100, nilai));
  const circleRadius = 48;
  const circleCirc = 2 * Math.PI * circleRadius;
  const dashOffset = circleCirc - (percentage / 100) * circleCirc;

  return (
    <div className="n-uts-wrapper">
      {/* user header */}
      <div className="n-uts-header">
        <div>
          <p className="n-uts-name">{user.nama}</p>
          <p className="n-uts-nim">NIM: {user.nim}</p>
        </div>

        <div className="n-uts-meta">
          <label>Pilih Mata Kuliah</label>
          <div className="n-uts-select-wrap">
            <select
              value={selectedMK}
              onChange={(e) => setSelectedMK(e.target.value)}
              className="n-uts-select"
            >
              {mataKuliahList.map((mk) => (
                <option key={mk} value={mk}>
                  {mk}
                </option>
              ))}
            </select>
            <span className="n-uts-select-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="n-uts-main">
        {/* left: ring + stats */}
        <div className="n-uts-left">
          <div className="n-uts-ring-card">
            <svg
              className="n-uts-ring"
              width="120"
              height="120"
              viewBox="0 0 120 120"
              aria-hidden
            >
              <defs>
                <linearGradient id="gradUTS" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#ff3d3d" />
                </linearGradient>
              </defs>
              <g transform="translate(60,60)">
                <circle
                  r={circleRadius}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="10"
                />
                <circle
                  r={circleRadius}
                  fill="transparent"
                  stroke="url(#gradUTS)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circleCirc}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90)"
                  style={{ transition: "stroke-dashoffset 800ms ease" }}
                />
                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fontSize="20"
                  fill="#fff"
                  fontWeight="700"
                >
                  {percentage}%
                </text>
              </g>
            </svg>

            <div className="n-uts-small-meta">
              <div className="n-uts-score-big">{nilai}</div>
              <div className="n-uts-grade">{getGrade(nilai)}</div>
            </div>
          </div>

          <div className="n-uts-stat-row">
            <div className="n-uts-stat">
              <div className="n-uts-stat-label">Tanggal UTS</div>
              <div className="n-uts-stat-value">{current.tanggal}</div>
            </div>

            <div className="n-uts-stat">
              <div className="n-uts-stat-label">Kategori</div>
              <div className="n-uts-stat-value">UTS</div>
            </div>
          </div>
        </div>

        {/* right: card detail */}
        <div className="n-uts-right">
          {/* use animKey as key to remount detail card for CSS enter animation,
              and also add class that triggers fade/slide transitions */}
          <div key={animKey} className="n-uts-card n-uts-card-animated">
            <div className="n-uts-card-head">
              <h3>{selectedMK}</h3>
              <span className="n-uts-tag">UTS</span>
            </div>

            <div className="n-uts-card-body">
              <p className="n-uts-comment-title">Komentar Dosen</p>
              <p className="n-uts-comment">{current.komentar}</p>
            </div>

            <div className="n-uts-actions">
              <button className="btn n-uts-btn">Minta Review</button>
              <button className="btn ghost">Lihat Rincian</button>
            </div>
          </div>

          <div className="n-uts-insight n-uts-card-animated">
            <h4>Insight</h4>
            <ul>
              <li>Target lulus: ≥ 70</li>
              <li>Rekomendasi: Perkuat dokumentasi & testing</li>
              <li>Status: {nilai >= 70 ? "Memenuhi" : "Perlu Perbaikan"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
