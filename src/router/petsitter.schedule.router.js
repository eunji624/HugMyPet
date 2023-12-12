import express from 'express';
const scheduleRouter = express.Router();

import { PetsitterScheduleController } from '../controller/petsitter.schedule.controller.js';
const petSitterScheduleController = new PetsitterScheduleController();

/* 특정 펫시터 예약 스케쥴 가져오기 */
scheduleRouter.get('/pet-sitter/:petSitterId', petSitterScheduleController.getSchedules);

export default scheduleRouter;