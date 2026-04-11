import express from "express";
import { register, login, getUserProfile } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js"; // Adjust path to your auth middleware

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getUserProfile); // <--- New Route

export default router;