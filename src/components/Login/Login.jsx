// src/components/Auth/Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

  const handleLogin = () => {
    if (!nim || !password) return setError("NIM dan Password wajib diisi!");
    setLoading(true);
    setError("");

    setTimeout(() => {
      const user = localUsers.find(
        (u) => (u.nim === nim || u.email === nim) && u.password === password
      );

      if (!user) {
        setError("NIM / Password salah atau akun belum terdaftar.");
        setLoading(false);
        return;
      }

      const result = login(user.email, user.password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message);
      }

      setLoading(false);
    }, 700);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="card-content">
<div className="avatar-container">
  <img src="/picture/logo1.png" alt="Logo UBSI"  />
</div>


          {/* LOGIN FORM */}
          <div className="form-container">
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="text"
                placeholder="NIM / Email"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="input-field"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
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

            <button className="login-button" onClick={handleLogin} disabled={loading}>
              {loading ? "Memproses..." : "LOGIN"}
            </button>

            <button className="forgot-password-link" onClick={() => navigate("/reset")}>
              Lupa Password?
            </button>

            <button className="register-link" onClick={() => navigate("/register")}>
              Belum punya akun? <strong>Daftar</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
