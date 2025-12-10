import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Bell, Settings, LogOut } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile sidebar
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  // Realtime clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => (n < 10 ? "0" + n : n);
  const formatTime = (d) =>
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const formatDate = (d) =>
    `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

  // notif dummy
  const [notifications] = useState([]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        {/* Burger */}
        <div className="burger" onClick={() => setOpen(!open)}>
          <div className={`line ${open ? "open" : ""}`}></div>
          <div className={`line ${open ? "open" : ""}`}></div>
          <div className={`line ${open ? "open" : ""}`}></div>
        </div>

        {/* Title */}
        <div className="nav-title">Universitas BIna Sarana Informatika One+</div>

        {/* Datetime */}
        <div className="nav-datetime">
          <span className="time">{formatTime(currentTime)}</span>
          <span className="date">{formatDate(currentTime)}</span>
        </div>

        {/* Icons Kanan */}
        <div className="nav-icons">
          {/* Notif */}
          <div
            className="nav-icon notif-icon"
            onClick={() => setNotifOpen(!notifOpen)}
            ref={notifRef}
          >
            <Bell size={20} />

            {notifOpen && (
              <div className="notif-dropdown">
                {notifications.length > 0 ? (
                  notifications.map((n, i) => (
                    <div className="notif-item" key={i}>
                      {n}
                    </div>
                  ))
                ) : (
                  <div className="notif-empty">belum ada pesan saat ini</div>
                )}
              </div>
            )}
          </div>

          {/* Profile */}
          <div
            className="nav-icon profile-icon"
            onClick={() => setProfileOpen(!profileOpen)}
            ref={profileRef}
          >
            <User size={20} />

            {profileOpen && (
              <div className="profile-dropdown">
                <button onClick={() => navigate("/profile")}>
                  <User size={16} /> Edit Profile
                </button>
                <button onClick={() => navigate("/setting")}>
                  <Settings size={16} /> Settings
                </button>
                <button onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <div className="mobile-links">

          {/* PROFILE */}
          <div
            className="mobile-item"
            onClick={() => navigate("/profile")}
          >
            <User size={20} />
            <span>Profile</span>
          </div>

          {/* SETTINGS */}
          <div
            className="mobile-item"
            onClick={() => navigate("/setting")}
            style={{ marginTop: "auto" }} // paling bawah
          >
            <Settings size={20} />
            <span>Settings</span>
          </div>

        </div>
      </div>
    </>
  );
}
