import express from 'express';
import PetSittersRouter from './petSitters.router.js';

import UsersRouter from './users.router.js';

import signUpRouter from './signUp.router.js';
import signInRouter from './signIn.router.js';

import ScheduleRouter from './petsitter.schedule.router.js';

const router = express.Router();

router.use('/sign-up', signUpRouter);
router.use('/sign-in', signInRouter);

router.use('/pet-sitters/', PetSittersRouter);
router.use('/reservation', UsersRouter);
router.use('/schedule', ScheduleRouter);

export default router;
