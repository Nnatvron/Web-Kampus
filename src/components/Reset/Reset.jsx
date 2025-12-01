// src/components/Reset/ResetForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X, Lock } from "lucide-react";

export default function ResetForm() {
  const navigate = useNavigate();

  // ===== STATE =====
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== FAKE LOCAL DATABASE =====
  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

  // ===== PASSWORD VALIDATION =====
  const passwordValidation = {
    minLength: newPassword.length >= 6,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // ===== RESET LOCAL PASSWORD =====
  const handleReset = () => {
    setError("");
    setSuccess("");

    const storedEmail = localStorage.getItem("resetEmail"); 
    if (!storedEmail) return setError("Tidak ada permintaan reset password.");

    if (!newPassword || !confirmPassword)
      return setError("Semua field wajib diisi!");
    if (newPassword !== confirmPassword)
      return setError("Password tidak cocok!");
    if (!isPasswordValid)
      return setError("Password belum memenuhi syarat keamanan!");

    setLoading(true);

    setTimeout(() => {
      const updatedUsers = localUsers.map(user =>
        user.email === storedEmail
          ? { ...user, password: newPassword }
          : user
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setSuccess("Password berhasil direset! Anda akan diarahkan ke login...");

      // hapus flag email reset
      localStorage.removeItem("resetEmail");

      setTimeout(() => navigate("/login"), 2000);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <h2 className="form-title">Reset Password</h2>

      {/* PASSWORD BARU */}
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
          className="password-toggle-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* KONFIRMASI PASSWORD */}
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
          className="password-toggle-icon"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* PASSWORD CHECKLIST */}
      {newPassword && (
        <div className="password-strength">
          {Object.entries(passwordValidation).map(([key, valid], idx) => {
            const labels = {
              minLength: "Minimal 6 karakter",
              hasUpperCase: "Minimal 1 huruf besar (A-Z)",
              hasNumber: "Minimal 1 angka",
              hasSymbol: "Minimal 1 simbol (!@#$%^&*)",
            };
            return (
              <div key={idx} className={`strength-item ${valid ? "valid" : "invalid"}`}>
                {valid ? <Check size={16} /> : <X size={16} />}
                <span>{labels[key]}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ERROR / SUCCESS */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <button className="login-button" onClick={handleReset} disabled={loading}>
        {loading ? "Memproses..." : "Reset Password"}
      </button>
    </div>
  );
}
