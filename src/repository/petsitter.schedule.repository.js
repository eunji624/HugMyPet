import { prisma } from '../utils/prisma/index.js';

export class PetsitterScheduleRepository {
  findSchedulesByPetSitterId = async (petSitterId) => {
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


  findScheduleByScheduleId = async (scheduleId) => {
    const schedule = await prisma.PetSitterSchedules.findFirst({
      where: { scheduleId: +scheduleId }
    })

    return schedule;
  }


  addSchedulesByDates = async (datesArr, petSitterId) => {
    for (const date of datesArr) {
      console.log("레포지토리입니다.", new Date(date));
      await prisma.PetSitterSchedules.create({
        data: {
          petSitterId,
          availableDate: new Date(date),
        },
      });
    }
  };


  updateScheduleByscheduleId = async (scheduleId, petSitterId, statusValue) => {
    await prisma.PetSitterSchedules.update({
      where: {
        scheduleId: +scheduleId,
        petSitterId
      },
      data: {
        status: statusValue,
        updatedAt: new Date()
      }
    })
  }


  destroyScheduleByScheduleId = async (scheduleId, petSitterId) => {
    await prisma.PetSitterSchedules.delete({
      where: {
        scheduleId: +scheduleId,
        petSitterId
      }
    })
  }

}