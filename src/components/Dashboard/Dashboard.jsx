import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User, BookOpen, Calendar, FileText, ClipboardList, CreditCard, Bell, GraduationCap } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);

  const sliderRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem("authUser");
      if (saved) setCurrentUser(JSON.parse(saved));
    } else {
      setCurrentUser(user);
    }
  }, [user]);

  // Banner data
  const bannerImages = [
    { text: 'Banner 1 / Info Kampus' },
    { text: 'Banner 2 / Promo' },
    { text: 'Banner 3 / Kegiatan' },
  ];

  // Auto scroll slider (tanpa loop saat hover)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const speed = 1;
    let animationFrame;

    const autoScroll = () => {
      if (!isHover) {
        slider.scrollLeft += speed;
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHover]);

  const quickAccess = [
    { icon: <BookOpen size={28} />, label: 'Jadwal' },
    { icon: <Calendar size={28} />, label: 'Kalender' },
    { icon: <FileText size={28} />, label: 'Nilai' },
    { icon: <ClipboardList size={28} />, label: 'KRS' },
    { icon: <CreditCard size={28} />, label: 'Bayar' },
    { icon: <Bell size={28} />, label: 'Pengumuman' },
    { icon: <GraduationCap size={28} />, label: 'Beasiswa' },
    { icon: <User size={28} />, label: 'Profil' },
    { icon: <BookOpen size={28} />, label: 'Materi' },
    { icon: <Calendar size={28} />, label: 'Agenda' },
  ];

  return (
    <div className="dashboard-wrapper">

      {/* Slider Banner */}
      <div 
        className="dashboard-slider-wrapper"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="dashboard-slider" ref={sliderRef}>
          {bannerImages.map((banner, idx) => (
            <div className="slider-item" key={idx}>
              <p>{banner.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Border container besar */}
      <div className="quick-access-container vertical-layout">
        <h3 className="container-title">Quick Access</h3>
        {/* Row 1 */}
        <div className="quick-access-row">
          {quickAccess.slice(0,4).map((item, idx) => (
            <div className="quick-access-item" key={idx}>
              <div className="quick-access-icon">{item.icon}</div>
              <p className="quick-access-label">{item.label}</p>
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="quick-access-row">
          {quickAccess.slice(4,8).map((item, idx) => (
            <div className="quick-access-item" key={idx}>
              <div className="quick-access-icon">{item.icon}</div>
              <p className="quick-access-label">{item.label}</p>
            </div>
          ))}
        </div>
        {/* Row 3 */}
        <div className="quick-access-row">
          {quickAccess.slice(8,10).map((item, idx) => (
            <div className="quick-access-item" key={idx}>
              <div className="quick-access-icon">{item.icon}</div>
              <p className="quick-access-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
