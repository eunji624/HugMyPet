import express from 'express';
import { needSignIn } from '../middlewares/member.login.middleware.js';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';
import { AuthController } from '../controller/auth.controller.js';

const petsitterAuthController = new PetsitterAuthController();
const authController = new AuthController();
const router = express.Router();

/* 유저 */
router.get('/users', needSignIn, authController.myProfile);

/* 펫시터 */
router.get('/pet-sitters', needSignIn, petsitterAuthController.myProfile);

export default router;
