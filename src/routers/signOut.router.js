import express from 'express';
import { needSignin } from '../middlewares/member.login.middleware.js';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';
import { AuthController } from '../controller/auth.controller.js';

const petsitterAuthController = new PetsitterAuthController();
const authController = new AuthController();
const router = express.Router();

/* 펫시터 */
router.delete('/pet-sitters', needSignin, petsitterAuthController.signOut);

/* 유저 */
router.delete('/users', needSignin, authController.signOut);

export default router;
