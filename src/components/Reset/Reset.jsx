// src/components/Reset/ResetForm.jsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Check, X, Lock } from "lucide-react";
import { auth } from "/firebase"; // pastikan path sesuai
import { confirmPasswordReset } from "firebase/auth";

export default function ResetForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode"); // ambil token dari URL

  // ==================== STATE ====================
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ==================== PASSWORD VALIDATION ====================
  const passwordValidation = {
    minLength: newPassword.length >= 6,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // ==================== HANDLER RESET PASSWORD ====================
  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) return setError("Semua field wajib diisi!");
    if (newPassword !== confirmPassword) return setError("Password tidak cocok!");
    if (!isPasswordValid) return setError("Password tidak memenuhi syarat keamanan!");

    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess("Password berhasil direset! Anda akan diarahkan ke login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Link reset password tidak valid atau sudah kadaluarsa.");
    } finally {
      setLoading(false);
    }
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
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle-icon"
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
          onClick={() => setShowConfirm(!showConfirm)}
          className="password-toggle-icon"
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* CHECKLIST PASSWORD */}
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

      <button className="login-button" disabled={loading} onClick={handleReset}>
        {loading ? "Memproses..." : "Reset Password"}
      </button>
    </div>
  );
}
