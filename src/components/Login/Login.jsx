// src/components/Login/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone, GraduationCap, Check, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // ===== STATE LOGIN =====
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ===== STATE REGISTER =====
  const [showRegister, setShowRegister] = useState(false);
  const [regForm, setRegForm] = useState({
    nim: '', nama: '', email: '', phone: '', jurusan: '', jenjang: '', password: '', confirmPassword: ''
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // ===== STATE FORGOT PASSWORD =====
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // ===== PASSWORD VALIDATION =====
  const passwordValidation = {
    minLength: regForm.password.length >= 6,
    hasUpperCase: /[A-Z]/.test(regForm.password),
    hasNumber: /\d/.test(regForm.password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(regForm.password),
  };
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // ===== LOCAL FAKE DATABASE =====
  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

  // ===== HANDLER LOGIN (LOCAL) =====
  const handleLogin = async () => {
    if (!nim || !password) return setError('NIM dan Password wajib diisi!');
    setLoading(true);
    setError('');

    setTimeout(() => {
      const user = localUsers.find(u => (u.nim === nim || u.email === nim) && u.password === password);

      if (!user) {
        setError("NIM / Password salah atau akun belum terdaftar.");
        setLoading(false);
        return;
      }

      login("dummy-token", user);
      navigate('/dashboard');
      setLoading(false);
    }, 700);
  };

  // ===== HANDLER REGISTER (LOCAL) =====
  const handleRegister = () => {
    const { nim, nama, email, password, confirmPassword, phone, jurusan, jenjang } = regForm;

    if (!nim || !nama || !email || !password || !confirmPassword)
      return setRegError('Semua field bertanda * wajib diisi!');
    if (password !== confirmPassword) return setRegError('Konfirmasi password tidak cocok!');
    if (!isPasswordValid) return setRegError('Password belum memenuhi standar keamanan!');

    setRegLoading(true);
    setRegError('');

    setTimeout(() => {
      const exists = localUsers.some(u => u.email === email || u.nim === nim);
      if (exists) {
        setRegError("Akun sudah terdaftar.");
        setRegLoading(false);
        return;
      }

      const newUser = { nim, nama, email, password, phone, jurusan, jenjang };
      const updated = [...localUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updated));

      setRegSuccess("Pendaftaran berhasil!");
      setTimeout(() => setShowRegister(false), 1500);

      setRegLoading(false);
    }, 900);
  };

  // ===== HANDLER FORGOT PASSWORD (LOCAL) =====
  const handleForgotPassword = () => {
    if (!resetEmail) return setResetError('Email wajib diisi!');
    setResetLoading(true);
    setResetError('');

    setTimeout(() => {
      const found = localUsers.some(u => u.email === resetEmail);

      if (!found) {
        setResetError("Email tidak ditemukan.");
      } else {
        setResetSuccess("Instruksi reset password dikirim (mode offline).");
      }

      setResetLoading(false);
    }, 900);
  };

  // ===== ENTER =====
  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') return;
    if (showRegister) handleRegister();
    else if (showForgotPassword) handleForgotPassword();
    else handleLogin();
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="card-content">
          <div className="avatar-container">
            <img src="/picture/logo1.png" alt="Logo UBSI" width={200} />
          </div>

          {/* LOGIN */}
          {!showRegister && !showForgotPassword && (
            <div className="form-container">
              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="text"
                  placeholder="NIM"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="input-field"
                  disabled={loading}
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
                  className="input-field"
                  disabled={loading}
                />
                <button type="button" className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button className="login-button" onClick={handleLogin} disabled={loading}>
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

          {/* FORGOT PASSWORD */}
          {showForgotPassword && (
            <div className="form-container">
              <p>Masukkan email Anda untuk reset password.</p>
              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="input-field"
                />
              </div>

              {resetError && <div className="error-message">{resetError}</div>}
              {resetSuccess && <div className="success-message">{resetSuccess}</div>}

              <button className="login-button" onClick={handleForgotPassword} disabled={resetLoading}>
                {resetLoading ? 'Mengirim...' : 'Kirim Reset Password'}
              </button>

              <button className="back-to-login" onClick={() => setShowForgotPassword(false)}>
                <ArrowLeft size={16} /> Kembali
              </button>
            </div>
          )}

          {/* REGISTER */}
          {showRegister && (
            <div className="form-container">
              {['nim','nama','email','phone','jurusan'].map((field,i) => {
                const icons = { nim: <User />, nama: <User />, email: <Mail />, phone: <Phone />, jurusan: <User /> };
                const placeholders = { nim: 'NIM *', nama: 'Nama Lengkap *', email: 'Email *', phone: 'No. Telepon (Opsional)', jurusan: 'Jurusan (Opsional)' };
                return (
                  <div key={i} className="input-group">
                    {icons[field]}
                    <input
                      className="input-field"
                      placeholder={placeholders[field]}
                      value={regForm[field]}
                      onChange={(e) => setRegForm({ ...regForm, [field]: e.target.value })}
                      disabled={regLoading}
                    />
                  </div>
                );
              })}

              <div className="input-group">
                <GraduationCap className="input-icon" />
                <select
                  className="input-field select-field"
                  value={regForm.jenjang}
                  onChange={(e) => setRegForm({ ...regForm, jenjang: e.target.value })}
                >
                  <option value="">Pilih Jenjang (Opsional)</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                </select>
              </div>

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  placeholder="Password *"
                  className="input-field"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                />
                <button type="button" className="password-toggle-icon" onClick={() => setShowRegPassword(!showRegPassword)}>
                  {showRegPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {regForm.password && (
                <div className="password-strength">
                  {Object.keys(passwordValidation).map((key,i) => (
                    <div key={i} className={`strength-item ${passwordValidation[key] ? 'valid' : 'invalid'}`}>
                      {passwordValidation[key] ? <Check size={16}/> : <X size={16}/>}
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

              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showRegConfirm ? 'text' : 'password'}
                  placeholder="Konfirmasi Password *"
                  className="input-field"
                  value={regForm.confirmPassword}
                  onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                  onKeyPress={handleKeyPress}
                />
                <button type="button" className="password-toggle-icon" onClick={() => setShowRegConfirm(!showRegConfirm)}>
                  {showRegConfirm ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {regError && <div className="error-message">{regError}</div>}
              {regSuccess && <div className="success-message">{regSuccess}</div>}

              <button className="login-button" onClick={handleRegister} disabled={regLoading}>
                {regLoading ? 'Mendaftar...' : 'DAFTAR'}
              </button>

              <button className="back-to-login" onClick={() => setShowRegister(false)}>
                <ArrowLeft size={16}/> Sudah punya akun? Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
