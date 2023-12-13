import { PetsitterScheduleService } from "../service/petsitter.schedule.service.js";

export class PetsitterScheduleController {
  petSitterScheduleService = new PetsitterScheduleService();

  getSchedules = async (req, res, next) => {
    try {
      const { petSitterId } = req.params;

      const schedule = await this.petSitterScheduleService.getSchedulesBypetSitterId(petSitterId);

      return res.status(200).json({ success: true, message: "스케쥴 조회에 성공했습니다.", data: schedule });
    } catch (err) {
      next(err);
    };
  };

  setSchedules = async (req, res, next) => {
    try {
      const { dates } = req.body;
      const { petSitterId } = res.locals.user;

      if (!dates) {
        throw Error("스케쥴을 입력해주세요.");
      };

      await this.petSitterScheduleService.setSchedulesByDates(dates, petSitterId);

      return res.status(201).json({ success: "true", message: "스케쥴 등록에 성공했습니다." });
    } catch (err) {
      next(err)
    };
  };

  updateSchedule = async (req, res, next) => {
    try {
      const { scheduleId } = req.params;
      const { petSitterId } = res.locals.user;

      await this.petSitterScheduleService.updateScheduleByScheduleId(scheduleId, petSitterId);

      return res.status(200).json({ success: "true", message: "스케쥴 업데이트에 성공했습니다." });
    } catch (err) {
      next(err)
    };
  }


  deleteSchedule = async (req, res, next) => {
    try {
      const { scheduleId } = req.params;
      const { petSitterId } = res.locals.user;

      await this.petSitterScheduleService.deleteScheduleByScheduleId(scheduleId, petSitterId);

      return res.status(200).json({ sucess: "true", message: "스케쥴 삭제에 성공했습니다." });
    } catch (err) {
      next(err);
    }
  }

};