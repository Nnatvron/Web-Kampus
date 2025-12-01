import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LogOut, 
  User, 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap,
  ClipboardList,
  CreditCard,
  Bell
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    // Kalau user dari context kosong, ambil dari localStorage
    if (!user) {
      const saved = localStorage.getItem("authUser");
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } else {
      setCurrentUser(user);
    }
  }, [user]);

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout();
      navigate('/login');
    }
  };

  const menuItems = [
    {
      icon: <BookOpen size={32} />,
      title: 'Jadwal Kuliah',
      description: 'Lihat jadwal kuliah semester ini',
      color: 'menu-blue',
      onClick: () => alert('Fitur Jadwal Kuliah - Coming Soon!')
    },
    {
      icon: <Calendar size={32} />,
      title: 'Kalender Akademik',
      description: 'Cek tanggal penting akademik',
      color: 'menu-purple',
      onClick: () => alert('Fitur Kalender Akademik - Coming Soon!')
    },
    {
      icon: <FileText size={32} />,
      title: 'Nilai & Transkrip',
      description: 'Lihat nilai dan transkrip',
      color: 'menu-green',
      onClick: () => alert('Fitur Nilai & Transkrip - Coming Soon!')
    },
    {
      icon: <ClipboardList size={32} />,
      title: 'KRS',
      description: 'Kartu Rencana Studi',
      color: 'menu-orange',
      onClick: () => alert('Fitur KRS - Coming Soon!')
    },
    {
      icon: <CreditCard size={32} />,
      title: 'Pembayaran',
      description: 'Status pembayaran SPP',
      color: 'menu-red',
      onClick: () => alert('Fitur Pembayaran - Coming Soon!')
    },
    {
      icon: <Bell size={32} />,
      title: 'Pengumuman',
      description: 'Lihat pengumuman terbaru',
      color: 'menu-pink',
      onClick: () => alert('Fitur Pengumuman - Coming Soon!')
    }
  ];

  return (
    <div className="dashboard-wrapper">
      
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <GraduationCap className="brand-icon" />
            <h1 className="brand-title">UBSI One+</h1>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </nav>

      <main className="main-content">

        <div className="welcome-card">
          <div className="welcome-content">
            <div className="user-avatar">
              <User size={32} />
            </div>
            <div className="user-info">
              <h2 className="welcome-title">Selamat Datang!</h2>

              <p className="user-detail">NIM: {currentUser?.nim}</p>
              <p className="user-detail">Nama: {currentUser?.nama}</p>
              <p className="user-detail">Jurusan: {currentUser?.jurusan}</p>
              <p className="user-detail">Jenjang: {currentUser?.jenjang}</p>
              
              {currentUser?.semester && (
                <p className="user-detail">Semester: {currentUser.semester}</p>
              )}
            </div>
          </div>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, idx) => (
            <MenuCard 
              key={idx} 
              icon={item.icon} 
              title={item.title} 
              description={item.description} 
              color={item.color}
              onClick={item.onClick}
            />
          ))}
        </div>

      </main>
    </div>
  );
}

function MenuCard({ icon, title, description, color, onClick }) {
  return (
    <div className={`menu-card ${color}`} onClick={onClick}>
      <div className="menu-icon-wrapper">
        <div className="menu-icon">{icon}</div>
      </div>
      <h3 className="menu-title">{title}</h3>
      <p className="menu-description">{description}</p>
    </div>
  );
}
