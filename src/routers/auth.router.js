import express from 'express';
import { AuthController } from '../controller/auth.controller.js';

const authController = new AuthController();
const router = express.Router();

// 회원가입
router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);

export default router;
