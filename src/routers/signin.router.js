import express from 'express';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';
import { AuthController } from '../controller/auth.controller.js';
import { loginValidation } from '../middlewares/joiValidation.js';

const petsitterAuthController = new PetsitterAuthController();
const authController = new AuthController();
const router = express.Router();

/* 유저 */
router.post('/users', loginValidation, authController.signIn);

/* 펫시터 */
router.post('/pet-sitters', loginValidation, petsitterAuthController.signIn);

export default router;
