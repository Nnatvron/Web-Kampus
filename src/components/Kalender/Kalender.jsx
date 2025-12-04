import React, { useState, useEffect } from "react";
import "./Kalender.css";
import { events as defaultEvents } from "./data";

export default function Kalender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState("");

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Load user events dari localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userEvents") || "[]");
    setUserEvents(saved);
  }, []);

  // Save user events ke localStorage
  useEffect(() => {
    localStorage.setItem("userEvents", JSON.stringify(userEvents));
  }, [userEvents]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Format tanggal: YYYY-MM-DD
  const formatDate = (day, month, year) => {
    const dd = String(day).padStart(2, "0");
    const mm = String(month + 1).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const handleAddEvent = () => {
    if (!selectedDate || !newEventTitle) return;
    const dateStr = formatDate(selectedDate, month, year);
    setUserEvents([...userEvents, { date: dateStr, title: newEventTitle }]);
    setNewEventTitle("");
  };

  // Cek apakah suatu tanggal memiliki event
  const isEvent = (day) => {
    const dateStr = formatDate(day, month, year);

    // Event default: cocok berdasarkan bulan & tanggal saja
    const defaultEvent = defaultEvents.find(ev => {
      const [evYear, evMonth, evDay] = ev.date.split("-");
      return parseInt(evDay) === day && parseInt(evMonth) === month + 1;
    });

    // Event user: cocok tanggal penuh
    const userEvent = userEvents.find(ev => ev.date === dateStr);

    return { defaultEvent, userEvent };
  };

  // Gabungkan semua event untuk list bawah kalender
  const allEvents = [
    ...defaultEvents.map(ev => ({ ...ev, type: "default" })),
    ...userEvents.map(ev => ({ ...ev, type: "user" }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="kalender-page-wrapper">
      <div className="kalender-wrapper">

        {/* Header bulan + tahun */}
        <div className="kalender-header">
          <button onClick={prevMonth} className="month-nav">&lt;</button>

          <div className="month-year-select">
            <select
              className="month-select"
              value={month}
              onChange={(e) => setCurrentDate(new Date(year, parseInt(e.target.value), 1))}
            >
              {monthNames.map((m, idx) => (
                <option key={idx} value={idx}>{m}</option>
              ))}
            </select>

            <select
              className="year-select"
              value={year}
              onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), month, 1))}
            >
              {Array.from({ length: 10 }, (_, i) => year - 5 + i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <button onClick={nextMonth} className="month-nav">&gt;</button>
        </div>

        {/* Grid tanggal */}
        <div className="kalender-grid">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="kalender-day-name">{day}</div>
          ))}

          {/* Blank cell sebelum tanggal pertama */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={"blank-" + i} className="kalender-cell blank"></div>
          ))}

          {/* Tanggal */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const { defaultEvent, userEvent } = isEvent(day);
            const isSelected = selectedDate === day;

            return (
              <div
                key={day}
                className={`kalender-cell 
                  ${defaultEvent ? "default-event" : ""} 
                  ${userEvent ? "user-event" : ""} 
                  ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedDate(day)}
                title={userEvent?.title || defaultEvent?.title || ""}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Tambah event user */}
        {selectedDate && (
          <div className="add-event-container">
            <input
              type="text"
              placeholder="Nama event baru..."
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <button onClick={handleAddEvent}>Tambah Event</button>
          </div>
        )}

        {/* List semua event */}
        <div className="event-list-wrapper">
          {allEvents.map((ev, idx) => (
            <div key={idx} className={`event-item ${ev.type}`}>
              <div className="event-date">{ev.date}</div>
              <div className="event-title">{ev.title}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
