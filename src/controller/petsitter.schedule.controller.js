import { PetsitterScheduleService } from '../service/petsitter.schedule.service.js';

export class PetsitterScheduleController {
	petSitterScheduleService = new PetsitterScheduleService();

	//펫시터의 스케줄을 조회합니다.
	getSchedules = async (req, res, next) => {
		try {
			const { petSitterId } = req.params;

			const schedule = await this.petSitterScheduleService.getSchedulesBypetSitterId(petSitterId);

			return res.status(200).json({ success: true, message: '스케쥴 조회에 성공했습니다.', data: schedule });
		} catch (err) {
			next(err);
		}
	};

	//펫시터의 스케줄을 등록합니다.
	setSchedules = async (req, res, next) => {
		try {
			const { dates } = req.body;
			const { petSitterId } = res.locals.user;

			if (!dates) {
				throw Error('스케쥴을 입력해주세요.');
			}

			const datesArr = dates.split(', ');

			/* 해당일(오늘) 이전 날짜/30일 이후는 예약 가능 스케쥴로 등록 불가 */
			datesArr.forEach((date) => {
				const currentDate = new Date();
				const inputDate = new Date(date);

				const thirtyDaysLater = new Date();
				thirtyDaysLater.setDate(currentDate.getDate() + 30);

				if (inputDate + 1 < currentDate || inputDate > thirtyDaysLater) {
					throw new Error('과거 날짜이거나 30일 이후의 날짜는 스케쥴로 등록할 수 없습니다.');
				}
			});

			await this.petSitterScheduleService.setSchedulesByDates(datesArr, petSitterId);

			return res.status(201).json({ success: 'true', message: '스케쥴 등록에 성공했습니다.' });
		} catch (err) {
			next(err);
		}
	};

	//펫시터의 스케줄을 수정합니다.
	updateSchedule = async (req, res, next) => {
		try {
			const { scheduleId } = req.params;
			const { petSitterId } = res.locals.user;

			await this.petSitterScheduleService.updateScheduleByScheduleId(scheduleId, petSitterId);

			return res.status(200).json({ success: 'true', message: '스케쥴 업데이트에 성공했습니다.' });
		} catch (err) {
			next(err);
		}
	};

	//펫시터의 스케줄을 삭제합니다.
	deleteSchedule = async (req, res, next) => {
		try {
			const { scheduleIds } = req.body;
			const { petSitterId } = res.locals.user;

			await this.petSitterScheduleService.deleteScheduleByScheduleId(scheduleIds, petSitterId);

			return res.status(200).json({ sucess: 'true', message: '스케쥴 삭제에 성공했습니다.' });
		} catch (err) {
			next(err);
		}
	};
}
