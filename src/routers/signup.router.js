import express from 'express';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';
import { AuthController } from '../controller/auth.controller.js';
<<<<<<< HEAD
import { registerValidation, petSitterRegisterValidation } from '../middlewares/joiValidation.js';
=======

>>>>>>> 684564a1ff50cd2d0bd64c4200ad3d1e2f06792d
const petsitterAuthController = new PetsitterAuthController();
const authController = new AuthController();
const router = express.Router();

/* 유저 */
router.post('/users', registerValidation, authController.signUp);

/* 펫시터 */
router.post('/pet-sitters', petSitterRegisterValidation, petsitterAuthController.signUp);

export default router;
