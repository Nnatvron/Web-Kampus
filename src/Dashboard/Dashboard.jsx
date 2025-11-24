  import { useContext } from 'react';
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
    const navigate = useNavigate();

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
        
        {/* Navbar */}
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

        {/* Main Content */}
        <main className="main-content">
          
          {/* Welcome Card */}
          <div className="welcome-card">
            <div className="welcome-content">
              <div className="user-avatar">
                <User size={32} />
              </div>
              <div className="user-info">
                <h2 className="welcome-title">Selamat Datang!</h2>
                <p className="user-detail">NIM: {user?.nim}</p>
                <p className="user-detail">Nama: {user?.nama}</p>
                <p className="user-detail">Jurusan: {user?.jurusan}</p>
                {user?.semester && (
                  <p className="user-detail">Semester: {user?.semester}</p>
                )}
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <MenuCard 
                key={index}
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