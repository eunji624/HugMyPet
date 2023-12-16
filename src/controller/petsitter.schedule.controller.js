import { PetsitterScheduleService } from '../service/petsitter.schedule.service.js';

export class PetsitterScheduleController {
	petSitterScheduleService = new PetsitterScheduleService();

	getSchedules = async (req, res, next) => {
		try {
			const { petSitterId } = req.params;

			const schedule = await this.petSitterScheduleService.getSchedulesBypetSitterId(petSitterId);

			return res.status(200).json({ success: true, message: '스케쥴 조회에 성공했습니다.', data: schedule });
		} catch (err) {
			next(err);
		}
	};

	setSchedules = async (req, res, next) => {
		try {
			const { dates } = req.body;
			console.log('프론트에서 어떻게 받는지 보고 싶네요 : ', dates);
			const { petSitterId } = res.locals.user;

			if (!dates) {
				throw Error('스케쥴을 입력해주세요.');
			}

			const datesArr = dates.split(', ');
			console.log('컨트롤러의 데이터 어레이 입니다. ', datesArr);

			/* 해당일(오늘) 이전 날짜/30일 이후는 예약 가능 스케쥴로 등록 불가 */
			datesArr.forEach((date) => {
				const currentDate = new Date();
				const inputDate = new Date(date);

				const thirtyDaysLater = new Date();
				thirtyDaysLater.setDate(currentDate.getDate() + 30);

				if (inputDate < currentDate || inputDate > thirtyDaysLater) {
					throw new Error('과거 날짜이거나 30일 이후의 날짜는 스케쥴로 등록할 수 없습니다.');
				}
			});

			await this.petSitterScheduleService.setSchedulesByDates(datesArr, petSitterId);

			return res.status(201).json({ success: 'true', message: '스케쥴 등록에 성공했습니다.' });
		} catch (err) {
			next(err);
		}
	};

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

	deleteSchedule = async (req, res, next) => {
		try {
			const { scheduleId } = req.params;
			const { petSitterId } = res.locals.user;

			await this.petSitterScheduleService.deleteScheduleByScheduleId(scheduleId, petSitterId);

			return res.status(200).json({ sucess: 'true', message: '스케쥴 삭제에 성공했습니다.' });
		} catch (err) {
			next(err);
		}
	};
}
