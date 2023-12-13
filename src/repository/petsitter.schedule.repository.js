import { prisma } from '../utils/prisma/index.js';

export class PetsitterScheduleRepository {
  findSchedulesById = async (petSitterId) => {
    const schedules = await prisma.PetSitterSchedules.findMany({
      where: {
        petSitterId: +petSitterId,
        status: "inProgress",
      },
      select: {
        scheduleId: true,
        petSitterId: true,
        status: true,
        availableDate: true,
      },
      orderBy: {
        availableDate: "asc",
      },
    });

    return schedules;
  };


  addSchedulesByDates = async (datesArr, petSitterId) => {
    await Promise.all(datesArr.map(async (date) => {
      await prisma.PetSitterSchedules.create({
        data: {
          petSitterId,
          availableDate: new Date(date),
        },
      });
    }));
  };

}