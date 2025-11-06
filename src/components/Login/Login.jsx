import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ⬅️ Tambah ini
import { Mail, Lock, ArrowLeft, User, Phone, Eye, EyeOff, Check, X, GraduationCap } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetNim, setResetNim] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const [showRegister, setShowRegister] = useState(false);
  const [regNim, setRegNim] = useState('');
  const [regNama, setRegNama] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regJurusan, setRegJurusan] = useState('');
  const [regJenjang, setRegJenjang] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

const API_URL = import.meta.env.VITE_API_URL || 'https://web-kampus-9i8ega164-natars-projects.vercel.app/api/auth';

  // ==================== PASSWORD VALIDATION ====================
  const validatePasswordStrength = (pass) => ({
    hasUpperCase: /[A-Z]/.test(pass),
    hasNumber: /\d/.test(pass),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    minLength: pass.length >= 6
  });

  const passwordValidation = validatePasswordStrength(regPassword);
  const isPasswordValid = 
    passwordValidation.hasUpperCase && 
    passwordValidation.hasNumber && 
    passwordValidation.hasSymbol && 
    passwordValidation.minLength;

  // ==================== LOGIN (Backend) ====================
  const handleLogin = async () => {
  if (!nim || !password) {
    setError('NIM dan Password harus diisi!');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const res = await axios.post(`${API_URL}/login`, { nim, password });

    login(res.data.token, res.data.user);
    navigate('/dashboard');
  } catch (err) {
    const message = err.response?.data?.message || "Login gagal";
    setError(message);
  } finally {
    setLoading(false);
  }
};

  // ==================== FORGOT PASSWORD (Backend) ====================
const handleForgotPassword = async () => {
  if (!resetEmail) {
    setResetError('Email harus diisi!');
    return;
  }

  setResetLoading(true);
  setResetError('');
  setResetSuccess('');

  try {
if (!resetNim || !resetEmail) {
  setResetError('NIM dan Email harus diisi!');
  return;
}

const res = await axios.post(`${API_URL}/forgot-password`, { nim: resetNim, email: resetEmail });


    setResetSuccess(res.data.message || "Link reset password telah dikirim ke email Anda!");
    setResetEmail('');

    setTimeout(() => {
      setShowForgotPassword(false);
      setResetSuccess('');
    }, 3000);
  } catch (err) {
    const message = err.response?.data?.message || "Gagal mengirim email reset password";
    setResetError(message);
  } finally {
    setResetLoading(false);
  }
};

  // ==================== REGISTER (Backend) ====================
 const handleRegister = async () => {
  if (!regNim || !regNama || !regEmail || !regPassword || !regConfirmPassword) {
    setRegError('Semua field wajib harus diisi!');
    return;
  }

  if (regPassword !== regConfirmPassword) {
    setRegError('Password tidak cocok!');
    return;
  }

  setRegLoading(true);
  setRegError('');
  setRegSuccess('');

  try {
    const res = await axios.post(`${API_URL}/register`, {
      nim: regNim,
      nama: regNama,
      email: regEmail,
      phone: regPhone,
      jurusan: regJurusan || 'Belum Ditentukan',
      jenjang: regJenjang || 'Belum Ditentukan',
      password: regPassword
    });

    setRegSuccess(res.data.message || "Pendaftaran berhasil! Silakan login.");
    setTimeout(() => {
      setShowRegister(false);
      setRegSuccess('');
    }, 2000);
  } catch (err) {
    const message = err.response?.data?.message || "Registrasi gagal";
    setRegError(message);
  } finally {
    setRegLoading(false);
  }
};

  // ==================== ENTER KEY ====================
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (showForgotPassword) handleForgotPassword();
      else if (showRegister) handleRegister();
      else handleLogin();
    }
  };

  // ==================== TOGGLE VIEW ====================
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
    setRegJenjang('');
  };

  // ==================== RETURN JSX (Tidak diubah) ====================
  return (
    <div className="login-wrapper">
      <div className="background-pattern">
        <div className="pattern-dots"></div>
      </div>

      <div className="login-card">
        <div className="card-content">
          <div className="avatar-container">
            <img src="/picture/logo1.png" alt="Logo UBSI" width="200" />
          </div>

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
        disabled={resetLoading}
        className="input-field"
      />
    </div>

    {resetError && <div className="error-message">{resetError}</div>}
    {resetSuccess && <div className="success-message">{resetSuccess}</div>}

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

              {/* Jenjang Pendidikan Dropdown */}
              <div className="input-group">
                <GraduationCap className="input-icon" />
                <select
                  value={regJenjang}
                  onChange={(e) => setRegJenjang(e.target.value)}
                  disabled={regLoading}
                  className="input-field select-field"
                >
                  <option value="">Pilih Jenjang Pendidikan (Opsional)</option>
                  <option value="D3">D3 - Diploma 3</option>
                  <option value="S1">S1 - Sarjana</option>
                  <option value="S2">S2 - Magister</option>
                </select>
              </div>

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  placeholder="Password *"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  disabled={regLoading}
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="password-toggle-icon"
                  disabled={regLoading}
                >
                  {showRegPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {regPassword && (
                <div className="password-strength">
                  <div className={`strength-item ${passwordValidation.minLength ? 'valid' : 'invalid'}`}>
                    {passwordValidation.minLength ? <Check size={16} /> : <X size={16} />}
                    <span>Minimal 6 karakter</span>
                  </div>
                  <div className={`strength-item ${passwordValidation.hasUpperCase ? 'valid' : 'invalid'}`}>
                    {passwordValidation.hasUpperCase ? <Check size={16} /> : <X size={16} />}
                    <span>Minimal 1 huruf besar</span>
                  </div>
                  <div className={`strength-item ${passwordValidation.hasNumber ? 'valid' : 'invalid'}`}>
                    {passwordValidation.hasNumber ? <Check size={16} /> : <X size={16} />}
                    <span>Minimal 1 angka</span>
                  </div>
                  <div className={`strength-item ${passwordValidation.hasSymbol ? 'valid' : 'invalid'}`}>
                    {passwordValidation.hasSymbol ? <Check size={16} /> : <X size={16} />}
                    <span>Minimal 1 simbol (!@#$%^&*)</span>
                  </div>
                </div>
              )}

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showRegConfirmPassword ? 'text' : 'password'}
                  placeholder="Konfirmasi Password *"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={regLoading}
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                  className="password-toggle-icon"
                  disabled={regLoading}
                >
                  {showRegConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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