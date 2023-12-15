import express from 'express';
import PetSittersRouter from './petSitters.router.js';

import UsersRouter from './users.router.js';

import signUpRouter from './signUp.router.js';
import signInRouter from './signin.router.js';
import signOutRouter from './signOut.router.js';
import myProfileRouter from './myProfile.router.js';
import logoutRouter from './logout.router.js';
import ReviewRouter from './review.router.js';
import ScheduleRouter from './petsitter.schedule.router.js';

const router = express.Router();

router.use('/sign-up', signUpRouter);
router.use('/sign-in', signInRouter);

router.use('/sign-out', signOutRouter);
router.use('/my-profile', myProfileRouter);
router.use('/logout', logoutRouter);

router.use('/pet-sitters/', PetSittersRouter);
router.use('/pet-sitters/reviews', ReviewRouter);
router.use('/reservation', UsersRouter);
router.use('/schedule', ScheduleRouter);

export default router;
