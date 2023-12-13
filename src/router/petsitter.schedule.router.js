import express from 'express';
const scheduleRouter = express.Router();

import { PetsitterScheduleController } from '../controller/petsitter.schedule.controller.js';
const petSitterScheduleController = new PetsitterScheduleController();

/* 스케쥴 추가하기 */
scheduleRouter.post('/pet-sitters', petSitterScheduleController.setSchedules)


/* 특정 펫시터 예약 스케쥴 가져오기 */
scheduleRouter.get('/pet-sitters/:petSitterId', petSitterScheduleController.getSchedules);

export default scheduleRouter;