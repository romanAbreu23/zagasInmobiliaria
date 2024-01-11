import express from "express";
import { loginForm, loginAuth, registerForm, register, confirmAccount, forgotPasswordForm,
    resetPassword, checkToken, newPassword, logout } from "../controllers/userController.js";

const router = express.Router();

router.get('/login', loginForm);
router.post('/login', loginAuth);

router.post('/cerrar-sesion', logout);

router.get('/registro', registerForm);
router.post('/registro', register);

router.get('/confirmar-cuenta/:token', confirmAccount);

router.get('/olvide-password', forgotPasswordForm);
router.post('/olvide-password', resetPassword);

// Almacena el nuevo password
router.get('/olvide-password/:token', checkToken);
router.post('/olvide-password/:token', newPassword);

export default router;