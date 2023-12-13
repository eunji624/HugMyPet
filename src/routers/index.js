import express from 'express';
import PetSittersRouter from './petSitters.router.js';

import UsersRouter from './users.router.js';
import AuthRouter from './auth.router.js';
import PetsitterAuthRouter from './petsitter.auth.router.js';
import ScheduleRouter from './petsitter.schedule.router.js';

const router = express.Router();

router.use('/pet-sitters/', [PetSittersRouter, PetsitterAuthRouter]);
router.use('/end-users', [UsersRouter, AuthRouter]);

export default router;
