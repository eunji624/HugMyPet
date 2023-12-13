import { PetsitterScheduleService } from "../service/petsitter.schedule.service.js";

export class PetsitterScheduleController {
  petSitterScheduleService = new PetsitterScheduleService();

  getSchedules = async (req, res, next) => {
    try {
      const { petSitterId } = req.params;

      const schedule = await this.petSitterScheduleService.getSchedulesById(petSitterId);

      return res.status(200).json({ success: true, message: "스케쥴 조회에 성공했습니다.", data: schedule });
    } catch (err) {
      next(err);
    };
  };

  setSchedules = async (req, res, next) => {
    try {
      const { dates } = req.body;

      if (!dates) {
        throw Error("스케쥴을 입력해주세요.");
      };

      await this.petSitterScheduleService.setSchedulesByDate(dates);

      return res.status(201).json({ success: "true", message: "스케쥴 등록에 성공했습니다." });
    } catch (err) {
      next(err)
    };
  };






};