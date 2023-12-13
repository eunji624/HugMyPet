import express from 'express';
import PetSittersRouter from './petSitters.router.js';
// import UsersRouter from './users.router.js';

const router = express.Router();

router.use('/pet-sitters/', PetSittersRouter);
router.use('/end-users/', UsersRouter);

export default router;
