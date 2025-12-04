import React, { useState } from "react";
import "./Jadwal.css";
import jadwalKuliah from "./data";
import { toast } from "react-toastify";

export default function Jadwal() {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at"];
  
  const jadwalByDay = days.map(day => ({
    day,
    events: jadwalKuliah.filter(j => j.day === day)
  }));

  const [openIndex, setOpenIndex] = useState(null);
  const [attendance, setAttendance] = useState({});

  const toggleDetail = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleAbsen = (key, event) => {
    const now = new Date();

    // Parse jam masuk dan keluar
    const [jamMasuk, jamKeluar] = event.time.split(' - ');
    const today = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
    
    const masukDate = new Date(`${today} ${jamMasuk}`);
    const keluarDate = new Date(`${today} ${jamKeluar}`);

    if (now < masukDate) {
      toast.info("UBSI OnePlus say: Belum waktunya absen ⏳");
      return;
    }
    if (now > keluarDate) {
      toast.error("UBSI OnePlus say: Telat kelas, absen tidak dihitung ❌");
      return;
    }

    // Absen berhasil
    setAttendance(prev => {
      const prevHistory = prev[key] || [];
      const timeString = now.toLocaleTimeString();
      return { ...prev, [key]: [...prevHistory, timeString] };
    });

    toast.success("UBSI OnePlus say: Absen berhasil ✅");
  };

  return (
    <div className="jadwal-wrapper">
      <h2 className="jadwal-title">Jadwal Kuliah</h2>
      <div className="jadwal-grid">
        {jadwalByDay.map(dayItem => (
          <div key={dayItem.day} className="jadwal-column">
            <div className="jadwal-day">{dayItem.day}</div>
            {dayItem.events.map((event, idx) => {
              const key = `${dayItem.day}-${idx}`;
              const [jamMasuk, jamKeluar] = event.time.split(' - ');
              const now = new Date();
              const today = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
              const masukDate = new Date(`${today} ${jamMasuk}`);
              const keluarDate = new Date(`${today} ${jamKeluar}`);
              const isDisabled = now < masukDate || now > keluarDate;

              return (
                <div key={idx}>
                  <div
                    className="jadwal-event"
                    style={{ backgroundColor: event.color }}
                    onClick={() => toggleDetail(key)}
                  >
                    <div className="jadwal-time">{event.time}</div>
                    <div className="jadwal-matkul">{event.matkul}</div>
                    <div className="jadwal-info">{event.room} - {event.lecturer}</div>
                  </div>

                  {openIndex === key && (
                    <div className="jadwal-detail">
                      <p><strong>Dosen:</strong> {event.lecturer}</p>
                      <p><strong>Ruang:</strong> {event.room}</p>
                      <p><strong>Jam Masuk:</strong> {jamMasuk}</p>
                      <p><strong>Jam Keluar:</strong> {jamKeluar}</p>
                      <button
                        className="absen-btn"
                        onClick={() => handleAbsen(key, event)}
                        disabled={isDisabled}
                      >
                        {isDisabled ? "Absen Tidak Tersedia" : "Absen"}
                      </button>

                      {attendance[key] && attendance[key].length > 0 && (
                        <div className="attendance-history">
                          <strong>History Absensi:</strong>
                          <ul>
                            {attendance[key].map((t, i) => <li key={i}>{t}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
