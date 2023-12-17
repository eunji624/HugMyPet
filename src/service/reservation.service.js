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
		console.log('memberId', memberId);
		//현재 펫시터 스케줄 조회
		const petSitterPossibleSchedule = await this.reservationRepository.findAllPossibleSchedule(petSitterId);

		//유저가 입력한 데이터랑 현재 펫시터 스케줄과 동일한 애들만 추출
		const stillPossibleSchedule = [];

		for (const schedule of petSitterPossibleSchedule) {
			const available = userSchedule[0].split(', ');
			for (const scheduleDate of available) {
				const test = scheduleDate + 'T00:00:00.000Z';
				// console.log('a=>', schedule.availableDate.toISOString());
				// console.log('b=>', test);

				if (schedule.availableDate.toISOString() === test) {
					stillPossibleSchedule.push(schedule);
				}
			}
		}

		console.log('stillPossibleSchedule', stillPossibleSchedule);

		if (!stillPossibleSchedule) throw new Error('이미 예약된 날짜입니다.');

		//예약 테이블에 데이터 추가 및 펫시터 스케줄 변경
		let successReservation = [];
		await Promise.all(
			stillPossibleSchedule.map(async (possibleSchedule, i) => {
				//예약테이블에 데이터 넣기
				console.log('=====>', possibleSchedule.availableDate, +possibleSchedule.scheduleId, memberId, petSitterId);
				const newReservation = await this.reservationRepository.createReservation(
					possibleSchedule.availableDate,
					+possibleSchedule.scheduleId,
					memberId,
					petSitterId
				);
				console.log('newReservation', newReservation);
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
		console.log('유저가 예약한 스케줄', currentReservation);

		//아직 가능한 펫시터 스케줄
		const petSitterPossibleSchedule = await this.reservationRepository.findAllPossibleSchedule(petSitterId);
		console.log('아직 가능한 펫시터 스케줄', petSitterPossibleSchedule);

		console.log('유저가 새로 입력한 스케줄', userSchedule);

		//유저의 기존 스케줄과, 새로 입력한 유저 스케줄에서 겹치는 애들만 빼고 나머지는 삭제 __ 삭제할 애들 따로 추룰
		const oldUserReservation = currentReservation.map((e) => e.availableDate);
		const newUserReservation = userSchedule[0].split(', ');
		const willDeleteReservation = [];

		for (const oldScheduleDate of oldUserReservation) {
			const testOldScheduleDate = oldScheduleDate.toISOString().split('T')[0]; // 이전 예약 날짜
			if (!newUserReservation.includes(testOldScheduleDate)) {
				willDeleteReservation.push(oldScheduleDate);
			}
		}
		console.log('==>> 삭제할 애들 모음 ==>', willDeleteReservation);

		//해당 유저 예약 스케줄 삭제하기
		willDeleteReservation.forEach(async (deleteReservation) => {
			console.log('deleteReservation', deleteReservation);
			const checkDeleteReservation = await this.reservationRepository.deleteReservationDate(deleteReservation);
			console.log('삭제 확인', checkDeleteReservation);
		});

		// currentReservation.filter((currentReservation) => {
		// 	willDeleteReservation.forEach(async (willDeleteReservation) => {
		// 		if (currentReservation.availableDate === willDeleteReservation) {
		// 			console.log('삭제할 데이터 아이디값 가져오기')
		// 			const deleteReservation = await this.reservationRepository.deleteReservation(
		// 				currentReservation.memberId,
		// 				currentReservation.petSitterId
		// 			);
		// 			console.log('deleteReservation', deleteReservation);
		// 		}
		// 	});
		// });

		// //유저가 새로 입력한 스케줄과 펫시터가 가능한 스케줄 비교
		// const stillPossibleSchedule = [];

		// for (const schedule of petSitterPossibleSchedule) {
		// 	const available = userSchedule[0].split(', ');
		// 	for (const scheduleDate of available) {
		// 		const test = scheduleDate + 'T00:00:00.000Z';

		// 		if (schedule.availableDate.toISOString() === test) {
		// 			stillPossibleSchedule.push(schedule);
		// 		}
		// 	}
		// }
		// console.log('유저입력 날짜와 펫시터 스케줄 비교', stillPossibleSchedule);

		// if (!stillPossibleSchedule) throw new Error('이미 예약된 날짜입니다.');
		// if (stillPossibleSchedule.length !== userSchedule.length) {
		// 	throw new Error('이미 예약된 날짜입니다.');
		// }

		// let updateReservationCreate = [];
		// let updateReservationDelete = [];
		// currentReservation.forEach(async (currentReservation, i) => {
		// 	const scheduleModifyCancel = await this.reservationRepository.updateSchedule();
		// });
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
		// const checkReservation = {
		// 	...getReservationInfo,
		// 	petSitterName: getPetSitterName.name
		// };
		return getReservationInfo;
	};
}
