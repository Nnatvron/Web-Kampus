import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetForm() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'https://ubsioneplus.vercel.app/api/auth';

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Semua field wajib diisi!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_URL}/reset-password/${token}`, {
        newPassword,
      });
      setSuccess(res.data.message || "Password berhasil direset!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-wrapper">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Password Baru"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Konfirmasi Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button onClick={handleReset} disabled={loading}>
        {loading ? "Loading..." : "Reset Password"}
      </button>
    </div>
  );
}
