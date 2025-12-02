// src/components/Reset/ResetForm.jsx
import { useState } from "react";
import { Eye, EyeOff, Check, X, Lock } from "lucide-react";
import "./Reset.css";

export default function ResetForm() {
  // ===== STATE =====
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== PASSWORD VALIDATION =====
  const passwordValidation = {
    minLength: newPassword.length >= 6,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // ===== HANDLE RESET =====
  const handleReset = () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Semua field wajib diisi!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }
    if (!isPasswordValid) {
      setError("Password belum memenuhi syarat keamanan!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSuccess("Password berhasil direset!");
      setLoading(false);
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  return (
    <div className="reset-wrapper">
      <div className="auth-container">
          <div className="avatar-container">
  <img src="/picture/logo1.png" alt="Logo UBSI"  />
</div>
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

        {/* PASSWORD STRENGTH CHECKLIST */}
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
                <div
                  key={idx}
                  className={`strength-item ${valid ? "valid" : "invalid"}`}
                >
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
    </div>
  );
}
