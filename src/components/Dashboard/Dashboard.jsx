import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  User, BookOpen, Calendar, FileText, ClipboardList, 
  CreditCard, Bell, GraduationCap, Map, MessageSquare 
} from 'lucide-react';
import Loader from "../Loader/Loader";
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);

  const sliderRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  // Loader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Ambil data user
  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem("authUser");
      if (saved) setCurrentUser(JSON.parse(saved));
    } else {
      setCurrentUser(user);
    }
  }, [user]);

  const bannerImages = [
    { text: 'Banner 1 / Info Kampus' },
    { text: 'Banner 2 / Promo' },
    { text: 'Banner 3 / Kegiatan' },
  ];

  // Infinite Loop Banner
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const speed = 1;
    let frame;

    if (!slider.dataset.cloned) {
      [...slider.children].forEach(child => {
        slider.appendChild(child.cloneNode(true));
      });
      slider.dataset.cloned = "true";
    }

    const scroll = () => {
      if (!isHover) {
        slider.scrollLeft += speed;
        const half = slider.scrollWidth / 2;
        if (slider.scrollLeft >= half) slider.scrollLeft %= half;
      }
      frame = requestAnimationFrame(scroll);
    };

    scroll();
    return () => cancelAnimationFrame(frame);
  }, [isHover]);

  const quickAccess = [
    { icon: <BookOpen size={28} />, label: 'Jadwal', path: '/jadwal' },
    { icon: <Calendar size={28} />, label: 'Kalender', path: '/kalender' },
    { icon: <FileText size={28} />, label: 'Nilai', path: '/nilai' },
    { icon: <ClipboardList size={28} />, label: 'Skripsi', path: '/skripsi' },
    { icon: <CreditCard size={28} />, label: 'Pembayaran', path: '/pembayaran' },
    { icon: <Bell size={28} />, label: 'Beasiswa', path: '/beasiswa' },
    { icon: <GraduationCap size={28} />, label: 'Materi', path: '/materi' },
    { icon: <User size={28} />, label: 'null', path: '/null' },
    { icon: <Map size={28} />, label: 'Lokasi.', path: '/lokasi' },
    { icon: <MessageSquare size={28} />, label: 'Bantuan.', path: '/bantuan' },
    { icon: <BookOpen size={28} />, label: 'Profile.', path: '/profile' },
    { icon: <Calendar size={28} />, label: 'Agenda.', path: '/agenda' },
  ];

  if (loading) return <Loader fadeOut={fadeOut} />;

  return (
    <div className="dashboard-wrapper">

      {/* Slider */}
      <div 
        className="dashboard-slider-wrapper"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="dashboard-slider" ref={sliderRef}>
          {bannerImages.map((banner, i) => (
            <div className="slider-item" key={i}>
              <p>{banner.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="quick-access-container">
        <h3 className="container-title">Quick Access</h3>

        <div className="quick-access-grid">
          {quickAccess.map((item, idx) => (
            <div 
              className="quick-access-item" 
              key={idx}
              onClick={() => item.path && navigate(item.path)}
            >
              <div className="quick-access-icon">{item.icon}</div>
              <p className="quick-access-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WA Button */}
      <a
        href="https://wa.me/6285882494679?text=Halo,%20saya%20ingin%20bertanya%20mengenai%20kampus%20UBSI."
        className="wa-floating-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="wa-icon"
        />
      </a>

    </div>
  );
}
