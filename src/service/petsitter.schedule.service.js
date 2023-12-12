import { PetsitterScheduleRepository } from "../repository/petsitter.schedule.repository.js";

export class PetsitterScheduleService {
  petSitterScheduleRepository = new PetsitterScheduleRepository();

  getSchedulesById = async (petSitterId) => {
    const schedules = await this.petSitterScheduleRepository.findSchedulesById(petSitterId);

    return schedules;
  };
};