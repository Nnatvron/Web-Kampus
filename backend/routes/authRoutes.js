import express from "express";
import cors from "cors";
import { register, login, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// ==================== Middleware ====================
// CORS supaya frontend bisa akses API
router.use(cors());

// ==================== AUTH ROUTES ====================
/**
 * POST /api/auth/register
 * Body: { nim, nama, email, password, phone, jurusan, jenjang }
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * Body: { nim, password }
 */
router.post("/login", login);

/**
 * POST /api/auth/forgot-password
 * Body: { nim, email }
 */
router.post("/forgot-password", forgotPassword);

/**
 * POST /api/auth/reset-password/:token
 * Body: { newPassword }
 */
router.post("/reset-password/:token", resetPassword);

export default router;
