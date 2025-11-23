import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Check, X, Lock } from "lucide-react";

export default function ResetForm() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(null);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://backend-kampus.vercel.app/";

  // ==================== CEK TOKEN VALID ATAU NGGAK ====================
  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.get(`${API_URL}/verify-reset-token/${token}`);
        setValidToken(true);
      } catch {
        setValidToken(false);
      }
    };
    checkToken();
  }, [API_URL, token]);

  // ==================== PASSWORD VALIDATION ====================
  const passwordValidation = {
    minLength: newPassword.length >= 6,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword)
      return setError("Semua field wajib diisi!");

    if (newPassword !== confirmPassword)
      return setError("Password tidak cocok!");

    if (!isPasswordValid)
      return setError("Password tidak memenuhi syarat keamanan!");

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/reset-password/${token}`, {
        password: newPassword,
      });

      setSuccess(res.data.message || "Password berhasil direset! Anda akan diarahkan ke login...");
      
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Token tidak valid atau expired.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== HANDLING TOKEN INVALID ====================
  if (validToken === false)
    return (
      <div className="auth-container">
        <h2 className="form-title">Token Tidak Valid</h2>
        <p className="error-message">
          Link reset password kamu sudah kedaluwarsa atau tidak valid.
        </p>
        <button className="login-button" onClick={() => navigate("/forgot-password")}>
          Kirim Ulang Email Reset
        </button>
      </div>
    );

  if (validToken === null) return <p style={{ textAlign: "center" }}>Memvalidasi token...</p>;

  return (
    <div className="auth-container">
      <h2 className="form-title">Reset Password</h2>

      {/* ===== PASSWORD BARU ===== */}
      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password Baru *"
          className="input-field"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle-icon"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* ===== CONFIRM PASSWORD ===== */}
      <div className="input-group">
        <Lock className="input-icon" />
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Konfirmasi Password *"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="password-toggle-icon"
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* ==================== PASSWORD CHECKLIST ==================== */}
      {newPassword && (
        <div className="password-strength">
          <div className={`strength-item ${passwordValidation.minLength ? "valid" : "invalid"}`}>
            {passwordValidation.minLength ? <Check size={16} /> : <X size={16} />}
            <span>Minimal 6 karakter</span>
          </div>
          <div className={`strength-item ${passwordValidation.hasUpperCase ? "valid" : "invalid"}`}>
            {passwordValidation.hasUpperCase ? <Check size={16} /> : <X size={16} />}
            <span>Minimal 1 huruf besar (A-Z)</span>
          </div>
          <div className={`strength-item ${passwordValidation.hasNumber ? "valid" : "invalid"}`}>
            {passwordValidation.hasNumber ? <Check size={16} /> : <X size={16} />}
            <span>Minimal 1 angka</span>
          </div>
          <div className={`strength-item ${passwordValidation.hasSymbol ? "valid" : "invalid"}`}>
            {passwordValidation.hasSymbol ? <Check size={16} /> : <X size={16} />}
            <span>Minimal 1 simbol (!@#$%^&*)</span>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <button className="login-button" disabled={loading} onClick={handleReset}>
        {loading ? "Memproses..." : "Reset Password"}
      </button>
    </div>
  );
}
