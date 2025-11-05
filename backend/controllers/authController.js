import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// ==================== REGISTER ====================
export const register = async (req, res) => {
  try {
    const { nim, nama, email, password, phone, jurusan, jenjang } = req.body;

    const userExist = await User.findOne({ $or: [{ nim }, { email }] });
    if (userExist)
      return res.status(400).json({ message: "NIM atau Email sudah terdaftar" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      nim,
      nama,
      email,
      password: hashed,
      phone,
      jurusan,
      jenjang,
    });

    res.status(201).json({ message: "Registrasi berhasil", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { nim, password } = req.body;
    const user = await User.findOne({ nim });
    if (!user) return res.status(400).json({ message: "NIM tidak ditemukan" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        nim: user.nim,
        nama: user.nama,
        email: user.email,
        jurusan: user.jurusan,
        jenjang: user.jenjang,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== FORGOT PASSWORD ====================
export const forgotPassword = async (req, res) => {
  try {
    const { nim, email } = req.body;
    if (!nim || !email)
      return res.status(400).json({ message: "NIM dan Email wajib diisi" });

    const user = await User.findOne({ nim, email });
    if (!user) return res.status(404).json({ message: "NIM atau Email tidak ditemukan" });

    // Buat token reset password
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Buat transporter nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password UBSI Portal",
      html: `<p>Halo ${user.nama},</p>
             <p>Untuk mereset password, klik link berikut:</p>
             <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>
             <p>Link berlaku 1 jam.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Link reset password telah dikirim ke email" });
  } catch (error) {
    console.error("Gagal kirim email:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==================== RESET PASSWORD ====================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword)
      return res.status(400).json({ message: "Token dan password baru wajib diisi" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });

    res.status(200).json({ message: "Password berhasil direset" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: error.message });
  }
};
