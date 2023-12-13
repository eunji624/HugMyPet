import { prisma } from '../utils/prisma/index.js';

export class PetsitterScheduleRepository {
  findSchedulesById = async (petSitterId) => {
    const schedules = await prisma.aVAILABLE_DATES.findMany(
      {
        where: {
          petSitterId: +petSitterId,
          status: "inProgress"
        }
      },
      {
        select: {
          scheduleId: true,
          petSitterId: true,
          status: true,
          availableDate: true
        }
      }
    )
    return schedules;
  }

  addSchedulesByDates = async (dates, petSitterId) => {
    await Promise.all(dates.map(async (date) => {
      prisma.aVAILABLE_DATES.create({
        data: {
          petSitterId,
          availableDate: date
        }
      });
    }));
  };

}