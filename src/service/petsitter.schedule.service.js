import { PetsitterScheduleRepository } from "../repository/petsitter.schedule.repository.js";

export class PetsitterScheduleService {
  petSitterScheduleRepository = new PetsitterScheduleRepository();

  getSchedulesBypetSitterId = async (petSitterId) => {
    const schedules = await this.petSitterScheduleRepository.findSchedulesByPetSitterId(petSitterId);

    return schedules;
  };

  setSchedulesByDates = async (dates, petSitterId) => {

    const datesArr = dates.split(",");

    /* 기존에 등록한 날짜가 있을 경우 에러 반환 */
    const existDates = await Promise.all(datesArr.map(async (date) => {
      const schedules = await this.petSitterScheduleRepository.findSchedulesByPetSitterId(petSitterId);
      return schedules.some(schedule => schedule.availableDate.toDateString() === new Date(date).toDateString());
    }));

    if (existDates.some(exist => exist)) {
      throw new Error("날짜를 다시 확인해주세요.");
    }

    await this.petSitterScheduleRepository.addSchedulesByDates(datesArr, petSitterId)

  }


  updateScheduleByscheduleId = async (scheduleId, petSitterId) => {
    const currentSchedule = await this.petSitterScheduleRepository.findScheduleByScheduleId(scheduleId);
    console.log('currentSchedule: ', currentSchedule);

    if (!currentSchedule) {
      throw new Error("해당하는 스케쥴이 존재하지 않습니다.")
    };

    if (currentSchedule.petSitterId !== petSitterId) {
      throw new Error("권한이 없습니다.");
    };

    const statusValue = currentSchedule.status === "inProgress" ? "Completed" : "inProgress";

    await this.petSitterScheduleRepository.updateScheduleByscheduleId(scheduleId, petSitterId, statusValue);

  }




};