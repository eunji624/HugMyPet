import express from 'express';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';
import { AuthController } from '../controller/auth.controller.js';
import { registerValidation, petSitterRegisterValidation } from '../middlewares/joiValidation.js';
const petsitterAuthController = new PetsitterAuthController();
const authController = new AuthController();
const router = express.Router();

/* 유저 */
router.post('/users', registerValidation, authController.signUp);

/* 펫시터 */
router.post('/pet-sitters', petSitterRegisterValidation, petsitterAuthController.signUp);

export default router;
