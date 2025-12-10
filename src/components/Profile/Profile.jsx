import { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    photo: null,
    name: "John Doe",
    nim: "123456789",
    email: "john.doe@ubsi.ac.id",
    phone: "081234567890",
    program: "Teknik Informatika",
    year: "2022",
    address: "Jl. Contoh No. 123, Jakarta",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfile((prev) => ({ ...prev, photo: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Profil berhasil disimpan!");
    // disini nanti bisa pakai API
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="profile_container">
      <h2 className="profile_title">Profil Mahasiswa</h2>

      <div className="profile_card">
        <div className="profile_photo_section">
          <img
            src={profile.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile_photo"
          />
          <label className="upload_btn">
            Ganti Foto
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>

        <div className="profile_form">
          <div className="profile_item">
            <label>Nama</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="profile_item">
            <label>NIM</label>
            <input type="text" value={profile.nim} readOnly />
          </div>

          <div className="profile_item">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="profile_item">
            <label>Nomor Telepon</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="profile_item">
            <label>Program Studi</label>
            <input type="text" value={profile.program} readOnly />
          </div>

          <div className="profile_item">
            <label>Tahun Masuk</label>
            <input type="text" value={profile.year} readOnly />
          </div>

          <div className="profile_item">
            <label>Alamat</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
            />
          </div>

          <div className="profile_buttons">
            <button className="profile_save" onClick={handleSave}>
              Simpan
            </button>
            <button className="profile_reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
