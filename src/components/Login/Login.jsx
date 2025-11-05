import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, User, Phone, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import emailjs from '@emailjs/browser'; // Import EmailJS yang benar
import './Login.css';

export default function Login() {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State untuk toggle show/hide password di login
  const [showPassword, setShowPassword] = useState(false);
  
  // State untuk Forgot Password
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetNim, setResetNim] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  
  // State untuk Register
  const [showRegister, setShowRegister] = useState(false);
  const [regNim, setRegNim] = useState('');
  const [regNama, setRegNama] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regJurusan, setRegJurusan] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ==================== LOGIN ====================
  const handleLogin = async () => {
    if (!nim || !password) {
      setError('NIM dan Password harus diisi!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Ambil data users dari localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Cari user berdasarkan NIM
      const user = users.find(u => u.nim === nim);
      
      if (user && user.password === password) {
        const userData = {
          nim: user.nim,
          nama: user.nama,
          jurusan: user.jurusan,
          email: user.email,
          phone: user.phone
        };
        
        login('token_' + user.nim, userData);
        navigate('/dashboard');
      } else {
        setError('NIM atau Password salah!');
      }
      
    } catch (err) {
      setError('Terjadi kesalahan, coba lagi!');
    } finally {
      setLoading(false);
    }
  };

  // ==================== FORGOT PASSWORD ====================
  const handleForgotPassword = async () => {
    if (!resetNim || !resetEmail) {
      setResetError('NIM dan Email harus diisi!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setResetError('Format email tidak valid!');
      return;
    }

    setResetLoading(true);
    setResetError('');
    setResetSuccess('');

    try {
      // Cek apakah NIM dan Email terdaftar di localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.nim === resetNim && u.email === resetEmail);

      if (!user) {
        setResetError('NIM atau Email tidak terdaftar!');
        setResetLoading(false);
        return;
      }

      // Generate token  sreset passwordederhana (bisa diganti dengan JWT atau UUID)
      const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Simpan token ke localStorage (dalam dunia nyata, simpan di database)
      const resetRequests = JSON.parse(localStorage.getItem('resetRequests')) || [];
      resetRequests.push({
        nim: resetNim,
        email: resetEmail,
        token: resetToken,
        expiresAt: Date.now() + 3600000 // 1 jam
      });
      localStorage.setItem('resetRequests', JSON.stringify(resetRequests));

      // Kirim email menggunakan EmailJS
      const templateParams = {
        to_email: resetEmail, // Email penerima
        user_name: user.nama, // Nama user
        reset_link: `${window.location.origin}/reset-password?token=${resetToken}`, // Link reset (sesuaikan dengan route kamu)
        nim: resetNim
      };

      // Ganti dengan ID service, template, dan user kamu dari EmailJS dashboard
      await emailjs.send(
        'YOUR_SERVICE_ID', // Ganti dengan Service ID dari EmailJS
        'YOUR_TEMPLATE_ID', // Ganti dengan Template ID dari EmailJS (buat template email di dashboard)
        templateParams,
        'YOUR_USER_ID' // Ganti dengan User ID dari EmailJS
      );

      setResetSuccess('Link reset password telah dikirim ke email Anda! Silakan cek inbox atau spam folder.');
      setResetNim('');
      setResetEmail('');
      
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetSuccess('');
      }, 3000);
      
    } catch (err) {
      console.error('Error sending email:', err);
      setResetError('Gagal mengirim email. Coba lagi nanti.');
    } finally {
      setResetLoading(false);
    }
  };

  // ==================== REGISTER ====================
  const handleRegister = async () => {
    // Validasi input
    if (!regNim || !regNama || !regEmail || !regPassword || !regConfirmPassword) {
      setRegError('Semua field harus diisi!');
      return;
    }

    // Validasi NIM (harus angka)
    if (!/^\d+$/.test(regNim)) {
      setRegError('NIM harus berupa angka!');
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setRegError('Format email tidak valid!');
      return;
    }

    // Validasi phone (opsional, kalau diisi)
    if (regPhone && !/^\d+$/.test(regPhone)) {
      setRegError('Nomor telepon harus berupa angka!');
      return;
    }

    // Validasi password minimal 6 karakter
    if (regPassword.length < 6) {
      setRegError('Password minimal 6 karakter!');
      return;
    }

    // Validasi password match
    if (regPassword !== regConfirmPassword) {
      setRegError('Password tidak cocok!');
      return;
    }

    setRegLoading(true);
    setRegError('');
    setRegSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Ambil data users dari localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Cek apakah NIM sudah terdaftar
      const nimExists = users.find(u => u.nim === regNim);
      if (nimExists) {
        setRegError('NIM sudah terdaftar! Silakan login.');
        setRegLoading(false);
        return;
      }

      // Cek apakah Email sudah terdaftar
      const emailExists = users.find(u => u.email === regEmail);
      if (emailExists) {
        setRegError('Email sudah terdaftar!');
        setRegLoading(false);
        return;
      }

      // Buat user baru
      const newUser = {
        nim: regNim,
        nama: regNama,
        email: regEmail,
        phone: regPhone,
        jurusan: regJurusan || 'Belum Ditentukan',
        password: regPassword,
        createdAt: new Date().toISOString()
      };

      // Simpan ke localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setRegSuccess('Pendaftaran berhasil! Silakan login.');
      
      // Reset form
      setRegNim('');
      setRegNama('');
      setRegEmail('');
      setRegPhone('');
      setRegPassword('');
      setRegConfirmPassword('');
      setRegJurusan('');

      // Auto redirect ke login setelah 2 detik
      setTimeout(() => {
        setShowRegister(false);
        setRegSuccess('');
      }, 2000);
      
    } catch (err) {
      setRegError('Terjadi kesalahan, coba lagi!');
    } finally {
      setRegLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (showForgotPassword) {
        handleForgotPassword();
      } else if (showRegister) {
        handleRegister();
      } else {
        handleLogin();
      }
    }
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setShowRegister(false);
    setError('');
    setResetError('');
    setResetSuccess('');
    setResetNim('');
    setResetEmail('');
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowForgotPassword(false);
    setError('');
    setRegError('');
    setRegSuccess('');
    setRegNim('');
    setRegNama('');
    setRegEmail('');
    setRegPhone('');
    setRegPassword('');
    setRegConfirmPassword('');
    setRegJurusan('');
  };

  return (
    <div className="login-wrapper">
      <div className="background-pattern">
        <div className="pattern-dots"></div>
      </div>

      <div className="login-card">
        <div className="card-content">
          
          {/* Logo */}
          <div className="avatar-container">
            <img src="/picture/logo1.png" alt="Logo UBSI" width="200" />
          </div>

          {/* Title */}
          <h2 className="login-title">
            {showForgotPassword ? '' : showRegister ? '' : ''}
          </h2>

          {/* ==================== LOGIN FORM ==================== */}
          {!showForgotPassword && !showRegister && (
            <div className="form-container">
              
              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="text"
                  placeholder="NIM"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-icon"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="login-button"
              >
                {loading ? 'Loading...' : 'LOGIN'}
              </button>

              <button
                type="button"
                onClick={toggleForgotPassword}
                className="forgot-password-link"
              >
                Lupa Password?
              </button>

              <button
                type="button"
                onClick={toggleRegister}
                className="register-link"
              >
                Belum punya akun? <strong>Daftar di sini</strong>
              </button>
            </div>
          )}

          {/* ==================== FORGOT PASSWORD FORM ==================== */}
          {showForgotPassword && (
            <div className="form-container">
              
              <p className="forgot-password-info">
                Masukkan NIM dan Email terdaftar Anda. Link reset password akan dikirim ke email.
              </p>

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="text"
                  placeholder="NIM"
                  value={resetNim}
                  onChange={(e) => setResetNim(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={resetLoading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={resetLoading}
                  className="input-field"
                />
              </div>

              {resetError && (
                <div className="error-message">
                  {resetError}
                </div>
              )}

              {resetSuccess && (
                <div className="success-message">
                  {resetSuccess}
                </div>
              )}

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="login-button"
              >
                {resetLoading ? 'Mengirim...' : 'Kirim Link Reset'}
              </button>

              <button
                type="button"
                onClick={toggleForgotPassword}
                className="back-to-login"
                disabled={resetLoading}
              >
                <ArrowLeft size={16} />
                Kembali ke Login
              </button>
            </div>
          )}

          {/* ==================== REGISTER FORM ==================== */}
          {showRegister && (
            <div className="form-container">
              
              <p className="forgot-password-info">
                Daftarkan akun baru untuk mengakses Portal Mahasiswa
              </p>

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="text"
                  placeholder="NIM *"
                  value={regNim}
                  onChange={(e) => setRegNim(e.target.value)}
                  disabled={regLoading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <User className="input-icon" />
                <input
                  type="text"
                  placeholder="Nama Lengkap *"
                  value={regNama}
                  onChange={(e) => setRegNama(e.target.value)}
                  disabled={regLoading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email *"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  disabled={regLoading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  placeholder="No. Telepon (Opsional)"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  disabled={regLoading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <User className="input-icon" />
                <input
                  type="text"
                  placeholder="Jurusan (Opsional)"
                  value={regJurusan}
                  onChange={(e) => setRegJurusan(e.target.value)}
                  disabled={regLoading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password (min. 6 karakter) *"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  disabled={regLoading}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type="password"
                  placeholder="Konfirmasi Password *"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={regLoading}
                  className="input-field"
                />
              </div>

              {regError && (
                <div className="error-message">
                  {regError}
                </div>
              )}

              {regSuccess && (
                <div className="success-message">
                  {regSuccess}
                </div>
              )}

              <button
                type="button"
                onClick={handleRegister}
                disabled={regLoading}
                className="login-button"
              >
                {regLoading ? 'Mendaftar...' : 'DAFTAR'}
              </button>

              <button
                type="button"
                onClick={toggleRegister}
                className="back-to-login"
                disabled={regLoading}
              >
                <ArrowLeft size={16} />
                Sudah punya akun? Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}