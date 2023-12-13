import express from 'express';
import PetSittersRouter from './petSitters.router.js';
import UsersRouter from './users.router.js';
import AuthRouter from './auth.router.js';

const router = express.Router();

router.use('/pet-sitters/', PetSittersRouter);
router.use('/end-users', [UsersRouter, AuthRouter]);

export default router;
