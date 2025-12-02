import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP NAV */}
      <nav className="navbar">
        <div className="burger" onClick={() => setOpen(!open)}>
          <div className={`line ${open ? "open" : ""}`}></div>
          <div className={`line ${open ? "open" : ""}`}></div>
          <div className={`line ${open ? "open" : ""}`}></div>
        </div>

        <div className="nav-title-container">
          <span className="nav-title">UBSI OnePlus</span>
        </div>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/dashboard/users">Users</Link>
          <Link to="/dashboard/courses">Courses</Link>
          <Link to="/dashboard/profile">Profile</Link>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <div className="mobile-links">
          <Link to="/dashboard" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/dashboard/users" onClick={() => setOpen(false)}>Users</Link>
          <Link to="/dashboard/courses" onClick={() => setOpen(false)}>Courses</Link>
        </div>

        {/* PROFILE di bawah */}
        <div className="mobile-profile">
          <Link to="/dashboard/profile" onClick={() => setOpen(false)}>
            <User size={20} style={{ marginRight: "10px" }} />
            Profile
          </Link>
        </div>
      </div>
    </>
  );
}
