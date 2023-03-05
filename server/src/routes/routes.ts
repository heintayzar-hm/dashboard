import express from "express";
import { register, login, logout } from "../controllers/userController";
import { cookieValidation, validateLoginData, validateRegistrationData } from "../middleware/auth";
const router = express.Router();

router.post("/register", validateRegistrationData , register);

// Login
router.post("/login", validateLoginData, login);

// logout
router.post('/logout', cookieValidation, logout)

export default router;
