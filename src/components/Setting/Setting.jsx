// src/components/Setting/Setting.jsx
import React, { useState } from "react";
import "./Setting.css";

export default function Setting() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("Pengaturan disimpan!");
  };

  return (
    <div className="setting_container">
      <h1 className="setting_title">Pengaturan Akun</h1>

      <div className="setting_card">
        <div className="setting_row">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Masukkan username"
          />
        </div>

        <div className="setting_row">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Masukkan email"
          />
        </div>

        <div className="setting_row">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Masukkan password baru"
          />
        </div>

        <button className="setting_button" onClick={handleSave}>
          Simpan Pengaturan
        </button>
      </div>
    </div>
  );
}
