// src/components/Auth/Register.jsx
import { useState } from "react";
import "./Register.css"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  GraduationCap,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [regForm, setRegForm] = useState({
    nim: "",
    nama: "",
    email: "",
    phone: "",
    jurusan: "",
    jenjang: "",
    password: "",
    confirmPassword: "",
  });

  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

  const passwordValidation = {
    minLength: regForm.password.length >= 6,
    hasUpperCase: /[A-Z]/.test(regForm.password),
    hasNumber: /\d/.test(regForm.password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(regForm.password),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleRegister = () => {
    const { nim, nama, email, password, confirmPassword } = regForm;

    if (!nim || !nama || !email || !password || !confirmPassword)
      return setRegError("Semua field bertanda * wajib diisi!");

    if (password !== confirmPassword)
      return setRegError("Konfirmasi password tidak cocok!");

    if (!isPasswordValid)
      return setRegError("Password belum memenuhi standar keamanan!");

    setRegLoading(true);
    setRegError("");

    setTimeout(() => {
      const exists = localUsers.some(
        (u) => u.email === email || u.nim === nim
      );

      if (exists) {
        setRegError("Akun sudah terdaftar.");
        setRegLoading(false);
        return;
      }

      const newUser = { ...regForm };
      const updated = [...localUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updated));

      setRegSuccess("Pendaftaran berhasil!");
      setTimeout(() => navigate("/login"), 1500);

      setRegLoading(false);
    }, 900);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="card-content">
          <div className="avatar-container">
  <img src="/picture/logo1.png" alt="Logo UBSI"  />
</div>
          <h2 className="register-title">Daftar Akun</h2>

          {/* FORM FIELDS */}
          {["nim", "nama", "email", "phone", "jurusan"].map((field) => {
            const IconComponent =
              field === "email"
                ? Mail
                : field === "phone"
                ? Phone
                : User;

            const placeholders = {
              nim: "NIM *",
              nama: "Nama Lengkap *",
              email: "Email *",
              phone: "No. Telepon (Opsional)",
              jurusan: "Jurusan (Opsional)",
            };

            return (
              <div className="input-group" key={field}>
                <IconComponent className="input-icon" />
                <input
                  className="input-field"
                  placeholder={placeholders[field]}
                  value={regForm[field]}
                  onChange={(e) =>
                    setRegForm({ ...regForm, [field]: e.target.value })
                  }
                />
              </div>
            );
          })}

          {/* JENJANG */}
          <div className="input-group">
            <GraduationCap className="input-icon" />
            <select
              className="input-field select-field"
              value={regForm.jenjang}
              onChange={(e) =>
                setRegForm({ ...regForm, jenjang: e.target.value })
              }
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
              type={showRegPassword ? "text" : "password"}
              placeholder="Password *"
              className="input-field"
              value={regForm.password}
              onChange={(e) =>
                setRegForm({ ...regForm, password: e.target.value })
              }
            />
            <button
              type="button"
              className="password-toggle-icon"
              onClick={() => setShowRegPassword(!showRegPassword)}
            >
              {showRegPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* PASSWORD CHECKLIST */}
          {regForm.password && (
            <div className="password-strength">
              {Object.keys(passwordValidation).map((key) => (
                <div
                  key={key}
                  className={`strength-item ${
                    passwordValidation[key] ? "valid" : "invalid"
                  }`}
                >
                  {passwordValidation[key] ? (
                    <Check size={16} />
                  ) : (
                    <X size={16} />
                  )}
                  <span>
                    {
                      {
                        minLength: "Minimal 6 karakter",
                        hasUpperCase: "Minimal 1 huruf besar",
                        hasNumber: "Minimal 1 angka",
                        hasSymbol: "Minimal 1 simbol (!@#$%^&*)",
                      }[key]
                    }
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type={showRegConfirm ? "text" : "password"}
              placeholder="Konfirmasi Password *"
              className="input-field"
              value={regForm.confirmPassword}
              onChange={(e) =>
                setRegForm({ ...regForm, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="password-toggle-icon"
              onClick={() => setShowRegConfirm(!showRegConfirm)}
            >
              {showRegConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* ERROR / SUCCESS */}
          {regError && <div className="error-message">{regError}</div>}
          {regSuccess && <div className="success-message">{regSuccess}</div>}

          {/* BUTTON DAFTAR */}
          <button
            className="login-button"
            onClick={handleRegister}
            disabled={regLoading}
          >
            {regLoading ? "Mendaftar..." : "DAFTAR"}
          </button>

          {/* LINK LOGIN – DI TENGAH */}
          <button
            className="back-to-login"
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              textAlign: "center",
              display: "block",
              marginTop: "15px",
            }}
          >
            Sudah punya akun? Login
          </button>
        </div>
      </div>
    </div>
  );
}
