import express from 'express';
import { needSignin } from '../middlewares/member.login.middleware.js';
import { PetsitterAuthController } from '../controller/petSitter.auth.controller.js';
import { AuthController } from '../controller/auth.controller.js';

const petsitterAuthController = new PetsitterAuthController();
const authController = new AuthController();
const router = express.Router();

/* 유저 */
router.post('/', needSignin, authController.logout);

/* 펫시터 */
router.post('/', needSignin, petsitterAuthController.logout);

export default router;
