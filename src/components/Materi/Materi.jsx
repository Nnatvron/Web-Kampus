import { useState } from "react";
import "./Materi.css";

const mataKuliahList = [
  {
    id: 1,
    name: "Matematika",
    materi: Array.from({ length: 14 }, (_, i) => ({
      pertemuan: i + 1,
      file: `Materi Matematika ${i + 1}.pdf`
    }))
  },
  {
    id: 2,
    name: "Fisika",
    materi: Array.from({ length: 14 }, (_, i) => ({
      pertemuan: i + 1,
      file: `Materi Fisika ${i + 1}.pdf`
    }))
  },
  {
    id: 3,
    name: "Kimia",
    materi: Array.from({ length: 14 }, (_, i) => ({
      pertemuan: i + 1,
      file: `Materi Kimia ${i + 1}.pdf`
    }))
  },
  {
    id: 4,
    name: "Biologi",
    materi: Array.from({ length: 14 }, (_, i) => ({
      pertemuan: i + 1,
      file: `Materi Biologi ${i + 1}.pdf`
    }))
  },
  {
    id: 5,
    name: "Sejarah",
    materi: Array.from({ length: 14 }, (_, i) => ({
      pertemuan: i + 1,
      file: `Materi Sejarah ${i + 1}.pdf`
    }))
  },
];

function Materi() {
  const [activeMK, setActiveMK] = useState(mataKuliahList[0].id);
  const [animate, setAnimate] = useState(false);

  const handleMKChange = (id) => {
    setAnimate(false); // reset animasi
    setActiveMK(id);
    setTimeout(() => setAnimate(true), 50); // trigger animasi
  };

  const currentMateri = mataKuliahList.find(mk => mk.id === activeMK).materi;

  return (
    <div className="materi_container">
      <h1 className="materi_title">Materi Per Mata Kuliah</h1>

      {/* Tabs Mata Kuliah */}
      <div className="materi_tabs">
        {mataKuliahList.map(mk => (
          <button
            key={mk.id}
            className={`materi_tab ${mk.id === activeMK ? "active" : ""}`}
            onClick={() => handleMKChange(mk.id)}
          >
            {mk.name}
          </button>
        ))}
      </div>

      {/* List Materi */}
      <div className="materi_list">
        {currentMateri.map((item, index) => (
          <div
            key={item.pertemuan}
            className={`materi_item ${animate ? "fadeInUp" : ""}`}
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <span className="materi_number">{item.pertemuan}</span>
            <span className="materi_file">{item.file}</span>
            <button className="materi_download">Unduh</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materi;
