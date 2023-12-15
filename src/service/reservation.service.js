export class ReservationService {
	constructor(reservationRepository) {
		this.reservationRepository = reservationRepository;
	}

	reservationPetSitter = async (petSitterId, userSchedule, memberId) => {
		//현재 펫시터 스케줄 조회
		const petSitterPossibleSchedule = await this.reservationRepository.findAllPossibleSchedule(petSitterId);

		const stillPossibleSchedule = petSitterPossibleSchedule.filter((schedule) => {
			return userSchedule.some((scheduleDate) => {
				return schedule.availableDate.getTime() === new Date(scheduleDate).getTime();
			});
		});

		if (!stillPossibleSchedule) throw new Error('이미 예약된 날짜입니다.');
		if (stillPossibleSchedule.length !== userSchedule.length) {
			throw new Error('이미 예약된 날짜입니다.');
		}

		let successReservation = [];
		await Promise.all(
			stillPossibleSchedule.map(async (possibleSchedule, i) => {
				//예약테이블에 데이터 넣기
				const newReservation = await this.reservationRepository.createReservation(
					possibleSchedule.availableDate,
					possibleSchedule.scheduleId,
					memberId,
					petSitterId
				);
				//펫시터 스케줄 테이블에 데이터 수정하기
				const modifyPetSitterSchedule = await this.reservationRepository.updatePetSitterSchedule(
					memberId,
					+possibleSchedule.scheduleId
				);

				if (!newReservation || !modifyPetSitterSchedule) throw new Error('잠시후 다시 예약해 주세요');

				return successReservation.push(newReservation);
			})
		);
		return successReservation;
	};

	modifyReservationPetSitter = async (petSitterId, memberId, userSchedule) => {
		//유저가 예약한 스케줄
		const currentReservation = await this.reservationRepository.findAllReservation(memberId);

		//아직 가능한 펫시터 스케줄
		const petSitterPossibleSchedule = await this.reservationRepository.findAllPossibleSchedule(petSitterId);

		const stillPossibleSchedule = petSitterPossibleSchedule.filter((schedule) => {
			return userSchedule.some((scheduleDate) => {
				return schedule.availableDate.getTime() === new Date(scheduleDate).getTime();
			});
		});

		if (!stillPossibleSchedule) throw new Error('이미 예약된 날짜입니다.');
		if (stillPossibleSchedule.length !== userSchedule.length) {
			throw new Error('이미 예약된 날짜입니다.');
		}

		let updateReservationCreate = [];
		let updateReservationDelete = [];
		currentReservation.forEach(async (currentReservation, i) => {
			const scheduleModifyCancel = await this.reservationRepository.updateSchedule();
		});
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

		return getReservationInfo;
	};
}
