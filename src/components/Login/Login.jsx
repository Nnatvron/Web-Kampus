import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Mail,
  Lock,
  ArrowLeft,
  User,
  Phone,
  Eye,
  EyeOff,
  Check,
  X,
  GraduationCap,
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // ==================== LOGIN STATE ====================
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ==================== RESET STATE ====================
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // ==================== REGISTER STATE ====================
  const [showRegister, setShowRegister] = useState(false);
  const [regNim, setRegNim] = useState('');
  const [regNama, setRegNama] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regJurusan, setRegJurusan] = useState('');
  const [regJenjang, setRegJenjang] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const API_URL = 'https://backend-kampus.vercel.app/';

  // ==================== VALIDATION ====================
  const passwordValidation = {
    hasUpperCase: /[A-Z]/.test(regPassword),
    hasNumber: /\d/.test(regPassword),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(regPassword),
    minLength: regPassword.length >= 6,
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // ==================== LOGIN HANDLER ====================
  const handleLogin = async () => {
    if (!nim || !password) return setError('NIM dan Password wajib diisi!');

    setLoading(true);
    setError('');

    try {
      const email = nim.includes('@') ? nim : `${nim}@gmail.com`;

      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  // ==================== REGISTER HANDLER ====================
  const handleRegister = async () => {
    if (!regNim || !regNama || !regEmail || !regPassword || !regConfirmPassword)
      return setRegError('Semua field bertanda * wajib diisi!');

    if (regPassword !== regConfirmPassword)
      return setRegError('Konfirmasi password tidak cocok!');

    if (!isPasswordValid)
      return setRegError('Password belum memenuhi standar keamanan!');

    setRegLoading(true);
    setRegError('');

    try {
      const res = await axios.post(`${API_URL}/register`, {
        email: regEmail,
        password: regPassword,
        nim: regNim,
        nama: regNama,
        phone: regPhone,
        jurusan: regJurusan || 'Belum ditentukan',
        jenjang: regJenjang || 'Belum ditentukan',
      });

      setRegSuccess(res.data.message || 'Pendaftaran berhasil!');
      setTimeout(() => setShowRegister(false), 2000);
    } catch (err) {
      setRegError(err.response?.data?.message || 'Registrasi gagal.');
    } finally {
      setRegLoading(false);
    }
  };

  // ==================== RESET PASSWORD ====================
  const handleForgotPassword = async () => {
    if (!resetEmail) return setResetError('Email wajib diisi!');

    setResetLoading(true);
    setResetError('');

    try {
      const res = await axios.post(`${API_URL}/forgot-password`, {
        email: resetEmail,
      });

      setResetSuccess(res.data.message);
      setResetEmail('');
    } catch (err) {
      setResetError(err.response?.data?.message || 'Gagal mengirim reset password.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') return;

    if (showRegister) handleRegister();
    else if (showForgotPassword) handleForgotPassword();
    else handleLogin();
  };

  return (
    <div className="login-wrapper">
      <div className="background-pattern">
        <div className="pattern-dots"></div>
      </div>

      <div className="login-card">
        <div className="card-content">

          {/* LOGO */}
          <div className="avatar-container">
            <img src="/picture/logo1.png" alt="Logo UBSI" width="200" />
          </div>

          {/* ================= LOGIN UI ================= */}
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
                  className="input-field"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button className="login-button" disabled={loading} onClick={handleLogin}>
                {loading ? 'Memproses...' : 'LOGIN'}
              </button>

              <button className="forgot-password-link" onClick={() => setShowForgotPassword(true)}>
                Lupa Password?
              </button>

              <button className="register-link" onClick={() => setShowRegister(true)}>
                Belum punya akun? <strong>Daftar</strong>
              </button>
            </div>
          )}

          {/* ================= FORGOT PASSWORD UI ================= */}
          {showForgotPassword && (
            <div className="form-container">
              <p className="forgot-password-info">
                Masukkan email akun Anda untuk reset password.
              </p>

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="input-field"
                />
              </div>

              {resetError && <div className="error-message">{resetError}</div>}
              {resetSuccess && <div className="success-message">{resetSuccess}</div>}

              <button className="login-button" onClick={handleForgotPassword}>
                {resetLoading ? 'Mengirim...' : 'Kirim Reset Password'}
              </button>

              <button className="back-to-login" onClick={() => setShowForgotPassword(false)}>
                <ArrowLeft size={16} /> Kembali
              </button>
            </div>
          )}

          {/* ================= REGISTER UI ================= */}
          {showRegister && (
            <div className="form-container">
              <p className="forgot-password-info">
                Daftar akun baru untuk mengakses portal mahasiswa.
              </p>

              {/* FIELD INPUT REGISTER */}
              {[
                { icon: <User />, placeholder: 'NIM *', state: regNim, setState: setRegNim },
                { icon: <User />, placeholder: 'Nama Lengkap *', state: regNama, setState: setRegNama },
                { icon: <Mail />, placeholder: 'Email *', state: regEmail, setState: setRegEmail },
                { icon: <Phone />, placeholder: 'No. Telepon (Opsional)', state: regPhone, setState: setRegPhone },
                { icon: <User />, placeholder: 'Jurusan (Opsional)', state: regJurusan, setState: setRegJurusan },
              ].map((item, i) => (
                <div key={i} className="input-group">
                  {item.icon}
                  <input
                    className="input-field"
                    placeholder={item.placeholder}
                    value={item.state}
                    onChange={(e) => item.setState(e.target.value)}
                    disabled={regLoading}
                  />
                </div>
              ))}

              {/* SELECT */}
              <div className="input-group">
                <GraduationCap className="input-icon" />
                <select
                  className="input-field select-field"
                  value={regJenjang}
                  onChange={(e) => setRegJenjang(e.target.value)}
                >
                  <option value="">Pilih Jenjang (Opsional)</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                </select>
              </div>

              {/* PASSWORD */}
              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  placeholder="Password *"
                  className="input-field"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                >
                  {showRegPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* PASSWORD STRENGTH */}
              {regPassword && (
                <div className="password-strength">
                  {Object.keys(passwordValidation).map((key, i) => (
                    <div
                      key={i}
                      className={`strength-item ${
                        passwordValidation[key] ? 'valid' : 'invalid'
                      }`}
                    >
                      {passwordValidation[key] ? <Check size={16} /> : <X size={16} />}
                      <span>
                        {{
                          minLength: 'Minimal 6 karakter',
                          hasUpperCase: 'Minimal 1 huruf besar',
                          hasNumber: 'Minimal 1 angka',
                          hasSymbol: 'Minimal 1 simbol (!@#$%^&*)',
                        }[key]}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CONFIRM PASSWORD */}
              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showRegConfirmPassword ? 'text' : 'password'}
                  placeholder="Konfirmasi Password *"
                  className="input-field"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                >
                  {showRegConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {regError && <div className="error-message">{regError}</div>}
              {regSuccess && <div className="success-message">{regSuccess}</div>}

              <button className="login-button" onClick={handleRegister} disabled={regLoading}>
                {regLoading ? 'Mendaftar...' : 'DAFTAR'}
              </button>

              <button className="back-to-login" onClick={() => setShowRegister(false)}>
                <ArrowLeft size={16} /> Sudah punya akun? Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
