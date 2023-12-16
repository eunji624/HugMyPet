import express from 'express';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';
import { AuthController } from '../controller/auth.controller.js';
import { registerValidation } from '../middlewares/joiValidation.js';
const petsitterAuthController = new PetsitterAuthController();
const authController = new AuthController();
const router = express.Router();
// merge
/* 유저 */
router.post('/users', authController.signUp);

/* 펫시터 */
router.post('/pet-sitters', petsitterAuthController.signUp);

export default router;
