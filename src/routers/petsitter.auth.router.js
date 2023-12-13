import express from 'express';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';

const petsitterAuthController = new PetsitterAuthController();
const router = express.Router();

// 회원가입
router.post('/sign-up', petsitterAuthController.signUp);
router.post('/sign-in', petsitterAuthController.signIn);

export default router;
