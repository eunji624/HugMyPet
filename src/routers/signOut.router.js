import express from 'express';
import { needSignIn } from '../middlewares/member.login.middleware.js';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';
import { AuthController } from '../controller/auth.controller.js';
import { signOut } from '../middlewares/joiValidation.js';

const petsitterAuthController = new PetsitterAuthController();
const authController = new AuthController();
const router = express.Router();

/* 펫시터 */
router.delete('/pet-sitters', needSignIn, signOut, petsitterAuthController.signOut);

/* 유저 */
router.delete('/users', needSignIn, signOut, authController.signOut);

export default router;
