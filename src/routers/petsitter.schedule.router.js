import express from 'express';

import { needSignIn } from '../middlewares/member.login.middleware.js';
import { PetsitterScheduleController } from '../controller/petsitter.schedule.controller.js';

const scheduleRouter = express.Router();
const petSitterScheduleController = new PetsitterScheduleController();

/* 특정 펫시터 예약 스케쥴 가져오기 */
scheduleRouter.get('/:petSitterId', petSitterScheduleController.getSchedules);

/* 아래 Router는 로그인이 필요한 API */
scheduleRouter.use(needSignIn);

/* 스케쥴 추가하기 */
scheduleRouter.post('/', petSitterScheduleController.setSchedules);

/* 스케쥴 수정하기 */
scheduleRouter.put('/:scheduleId', petSitterScheduleController.updateSchedule);

/* 스케쥴 삭제하기 */
scheduleRouter.delete('/', petSitterScheduleController.deleteSchedule);

/* 스케쥴 삭제하기 */
scheduleRouter.delete('/:scheduleId', petSitterScheduleController.deleteSchedule);

export default scheduleRouter;
