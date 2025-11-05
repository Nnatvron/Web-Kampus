import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nim: { type: String, required: true, unique: true },
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  jurusan: { type: String },
  jenjang: { type: String },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
