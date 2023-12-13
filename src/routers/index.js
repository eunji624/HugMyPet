import express from 'express';
import PetSittersRouter from './petSitters.router.js';
import ScheduleRouter from './petsitter.schedule.router.js'
import UsersRouter from './users.router.js';

const router = express.Router();

router.use('/pet-sitters/', PetSittersRouter, ScheduleRouter);
router.use('/end-users/', UsersRouter);

export default router;
