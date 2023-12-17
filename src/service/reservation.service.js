import e from 'express';

export class ReservationService {
	constructor(reservationRepository) {
		this.reservationRepository = reservationRepository;
	}

	//특정 펫시터 정보 조회
	findFirstPetSitterData = async (petSitterId) => {
		const petSitterData = await this.reservationRepository.findFirstPetSitterData(petSitterId);

		return petSitterData;
	};

	reservationPetSitter = async (petSitterId, userSchedule, memberId) => {
		//현재 펫시터 스케줄 조회
		const petSitterPossibleSchedule = await this.reservationRepository.findAllPossibleSchedule(petSitterId);

		//유저가 입력한 데이터랑 현재 펫시터 스케줄과 동일한 애들만 추출
		const stillPossibleSchedule = [];

		for (const schedule of petSitterPossibleSchedule) {
			const available = userSchedule[0].split(', ');
			for (const scheduleDate of available) {
				const test = scheduleDate + 'T00:00:00.000Z';

				if (schedule.availableDate.toISOString() === test) {
					stillPossibleSchedule.push(schedule);
				}
			}
		}

		//예약 테이블에 데이터 추가 및 펫시터 스케줄 변경
		let successReservation = [];
		await Promise.all(
			stillPossibleSchedule.map(async (possibleSchedule, i) => {
				//예약테이블에 데이터 넣기
				const newReservation = await this.reservationRepository.createReservation(
					possibleSchedule.availableDate,
					+possibleSchedule.scheduleId,
					memberId,
					petSitterId
				);
				//펫시터 스케줄 테이블에 데이터 수정하기
				const modifyPetSitterSchedule = await this.reservationRepository.updatePetSitterSchedule(
					memberId,
					+possibleSchedule.scheduleId
				);

				if (!newReservation || !modifyPetSitterSchedule)
					throw new Error('이미 처리된 예약건 입니다. 잠시후 다시 예약해 주세요.');

				return successReservation.push(newReservation);
			})
		);
		return successReservation;
	};

	modifyReservationPetSitter = async (petSitterId, memberId, userSchedule) => {
		//유저가 예약한 스케줄
		const currentReservation = await this.reservationRepository.findAllUserReservationSchedule(memberId);

		//아직 가능한 펫시터 스케줄
		const petSitterPossibleSchedule = await this.reservationRepository.findAllPossibleSchedule(petSitterId);

		//삭제할 날짜들 고르기
		// const oldUserReservation = currentReservation.map((e) => e.availableDate);
		const newUserReservation = userSchedule[0].split(', ');
		const willDeleteReservation = [];
		const petSitterCancelScheduleId = [];

		for (const oldScheduleDate of currentReservation) {
			const testOldScheduleDate = oldScheduleDate.availableDate.toISOString().split('T')[0]; // 이전 예약 날짜
			if (!newUserReservation.includes(testOldScheduleDate)) {
				willDeleteReservation.push(oldScheduleDate.availableDate);
				petSitterCancelScheduleId.push(oldScheduleDate.scheduleId);
			}
		}

		//새로 추가되는 날짜들 고르기
		const willCreateReservation = [];
		const petSitterCreateScheduleId = [];
		const userScheduleArray = userSchedule[0].split(', ');
		for (const eachUserSchedule of userScheduleArray) {
			const newUserScheduleDateType = eachUserSchedule + 'T00:00:00.000Z';
			for (const petSitterPossibleDate of petSitterPossibleSchedule) {
				if (petSitterPossibleDate.availableDate.toISOString() === newUserScheduleDateType) {
					const putData = {
						petSitterId,
						memberId,
						scheduleId: petSitterPossibleDate.scheduleId,
						reservationDate: petSitterPossibleDate.availableDate
					};
					willCreateReservation.push(putData);
					petSitterCreateScheduleId.push(petSitterPossibleDate.scheduleId);
				}
			}
		}
		console.log('willCreateReservation', willCreateReservation);
		console.log('willDeleteReservation', willDeleteReservation);

		//해당 유저 예약 스케줄 삭제하기(벌크로 처리)
		const checkDeleteReservation = await this.reservationRepository.deleteReservationDate(willDeleteReservation);

		//해당 유저 예약 스케줄 추가하기(벌크로 처리)
		const checkCreateReservation = await this.reservationRepository.createReservationDate(willCreateReservation);

		console.log('checkDeleteReservation', checkDeleteReservation); //{ count: 2 }
		console.log('checkCreateReservation', checkCreateReservation);

		//취소된 스케줄_ 벌크로 업데이트 처리
		const modifyCancelSchedule =
			await this.reservationRepository.updateManyCancelPetSitterSchedule(petSitterCancelScheduleId);
		console.log('modifyCancelSchedule', modifyCancelSchedule);

		//추가된 스케줄_ 벌크로 업데이트 처리
		const modifyCreateSchedule = await this.reservationRepository.updateManyCreatePetSitterSchedule(
			petSitterCreateScheduleId,
			memberId
		);
		console.log('modifyCreateSchedule', modifyCreateSchedule);

		//현재 유저의 예약된 데이터 보여주기
		const nowReservation = await this.reservationRepository.findAllUserReservationSchedule(memberId);
		return nowReservation;
	};

	deleteReservation = async (memberId, petSitterId) => {
		//해당 유저가 예약한 모든 데이터 추출
		const userReservationSchedule = await this.reservationRepository.findAllUserReservationSchedule(+memberId);

		//해당 유저 예약 스케줄 삭제하기
		const deleteReservation = await this.reservationRepository.deleteReservation(memberId, petSitterId);

		//펫시터 스케줄 수정하기
		userReservationSchedule.map(async (e) => {
			await this.reservationRepository.updateSchedule(memberId, +e.scheduleId);
		});

		return deleteReservation;
	};

	getReservationInfo = async (memberId) => {
		const getReservationInfo = await this.reservationRepository.getReservationInfo(memberId);

		const getPetSitterName = await this.reservationRepository.findFirstPetSitterData(getReservationInfo.petSitterId);
		getReservationInfo.map((e) => {
			e.petSitterName = getPetSitterName.name;
		});
		return getReservationInfo;
	};
}
