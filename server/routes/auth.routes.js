import express from 'express';
const router = express.Router();
import { signup, login, logout, forgotPassword } from '../controllers/auth.controller.js';
import { verifyToken } from '../Middlewares/verifyToken.js';
import { checkAuth, verifyEmail, resetPassword } from '../controllers/auth.controller.js';
router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


router.post("/forgot-password", forgotPassword);
router.post("/verify-email", verifyEmail);


router.post("/reset-password/:token", resetPassword);




    export default router;