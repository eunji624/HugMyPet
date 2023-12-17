import { prisma } from '../utils/prisma/index.js';

export class PetsitterScheduleRepository {
	//펫시터의 스케줄을 조회합니다.(펫시터 아이디로))
	findSchedulesByPetSitterId = async (petSitterId) => {
		const schedules = await prisma.PetSitterSchedules.findMany({
			where: {
				petSitterId: +petSitterId,
				status: 'inProgress'
			},
			select: {
				scheduleId: true,
				petSitterId: true,
				status: true,
				availableDate: true
			},
			orderBy: {
				availableDate: 'asc'
			}
		});

		return schedules;
	};

	//펫시터의 스케줄을 조회합니다(스케줄 아이디로)

	findScheduleByScheduleId = async (scheduleId) => {
		const schedule = await prisma.PetSitterSchedules.findFirst({
			where: { scheduleId: +scheduleId }
		});

		return schedule;
	};

	//펫시터의 가능한 스케줄을 추가합니다.
	addSchedulesByDates = async (datesArr, petSitterId) => {
		for (const date of datesArr) {
			await prisma.PetSitterSchedules.create({
				data: {
					petSitterId,
					availableDate: new Date(date)
				}
			});
		}
	};

	//펫시터가 등록한 스케줄을 수정합니다.
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
		});
	};

	//펫시터가 등록한 스케줄을 삭제합니다.
	destroyScheduleByScheduleId = async (scheduleIds, petSitterId) => {
		for (const scheduleId of scheduleIds) {
			await prisma.PetSitterSchedules.delete({
				where: {
					scheduleId: +scheduleId,
					petSitterId
				}
			});
		}
	};

	//한번에 삭제
	// destroyScheduleByScheduleId = async (scheduleIds, petSitterId) => {
	// 	const deleteSchedule = await prisma.petSitterSchedules.deleteMany({
	// 		where: {
	// 			scheduleId: {
	// 				in: scheduleIds
	// 			}
	// 		}
	// 	});
	// 	return deleteSchedule;
	// };
}
