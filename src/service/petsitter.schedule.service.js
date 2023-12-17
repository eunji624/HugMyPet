import { PetsitterScheduleRepository } from '../repository/petsitter.schedule.repository.js';

export class PetsitterScheduleService {
	petSitterScheduleRepository = new PetsitterScheduleRepository();

	//펫시터의 스케줄을 조회합니다.
	getSchedulesBypetSitterId = async (petSitterId) => {
		const schedules = await this.petSitterScheduleRepository.findSchedulesByPetSitterId(petSitterId);

		return schedules;
	};

	//펫시터의 스케줄을 등록합니다.
	setSchedulesByDates = async (datesArr, petSitterId) => {
		/* 기존에 등록한 날짜가 있을 경우 에러 반환 */
		const existDates = await Promise.all(
			datesArr.map(async (date) => {
				const schedules = await this.petSitterScheduleRepository.findSchedulesByPetSitterId(petSitterId);
				return schedules.some((schedule) => schedule.availableDate.toDateString() === new Date(date).toDateString());
			})
		);

		if (existDates.some((exist) => exist)) {
			throw new Error('날짜를 다시 확인해주세요.');
		}

		await this.petSitterScheduleRepository.addSchedulesByDates(datesArr, petSitterId);
	};

	//펫시터의 스케줄을 수정합니다.
	updateScheduleByScheduleId = async (scheduleId, petSitterId) => {
		const existSchedule = await this.petSitterScheduleRepository.findScheduleByScheduleId(scheduleId);

		if (!existSchedule) {
			throw new Error('해당하는 스케쥴이 존재하지 않습니다.');
		}

		if (existSchedule.petSitterId !== petSitterId) {
			throw new Error('권한이 없습니다.');
		}

		const statusValue = existSchedule.status === 'inProgress' ? 'Completed' : 'inProgress';

		await this.petSitterScheduleRepository.updateScheduleByscheduleId(scheduleId, petSitterId, statusValue);
	};

	//펫시터의 스케줄을 삭제합니다.
	deleteScheduleByScheduleId = async (scheduleIds, petSitterId) => {
		await Promise.all(
			scheduleIds.map(async (scheduleId) => {
				const schedule = await this.petSitterScheduleRepository.findScheduleByScheduleId(scheduleId);
				if (!schedule) {
					throw new Error('해당하는 스케쥴이 존재하지 않습니다.');
				}
			})
		);

		await this.petSitterScheduleRepository.destroyScheduleByScheduleId(scheduleIds, petSitterId);
	};
}
