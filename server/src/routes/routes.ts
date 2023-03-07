import express from "express";
import { register, login, logout, validateUser } from "../controllers/userController";
import { cookieValidation, validateLoginData, validateRegistrationData } from "../middleware/auth";
const router = express.Router();

router.post("/register", validateRegistrationData , register);

// Login
router.post("/login", validateLoginData, login);

// logout
router.post('/logout', cookieValidation, logout)

// get user

// user validation
router.get('/users/user/validate', cookieValidation, validateUser)
export default router;
