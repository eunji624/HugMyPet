export class ReservationRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}

	//펫시터 데이터 조회
	findFirstPetSitterData = async (petSitterId) => {
		const petSitterData = this.prisma.petSitters.findFirst({
			where: { petSitterId },
			select: {
				email: true,
				name: true,
				selfIntro: true,
				availablePet: true,
				availableAddress: true,
				certificate: true,
				score: true,
				imagePath: true
			}
		});
		return petSitterData;
	};

	//펫시터의 가능한 스케줄
	findAllPossibleSchedule = async (petSitterId) => {
		const petSitterPossibleSchedule = this.prisma.petSitterSchedules.findMany({
			where: {
				petSitterId,
				status: 'inProgress'
			}
		});
		return petSitterPossibleSchedule;
	};

	//펫시터를 예약합니다.
	createReservation = async (availableDate, scheduleId, memberId, petSitterId) => {
		const newReservation = this.prisma.reservations.create({
			data: {
				reservationDate: availableDate,
				petSitterId: petSitterId,
				memberId: memberId,
				scheduleId: scheduleId,
				status: 'Completed'
			}
		});
		return newReservation;
	};

	//펫시터의 스케줄을 변경합니다.
	updatePetSitterSchedule = async (memberId, scheduleId) => {
		const updatePetSitterSchedule = this.prisma.petSitterSchedules.update({
			where: { scheduleId },
			data: {
				status: 'Completed',
				memberId
			}
		});
		return updatePetSitterSchedule;
	};

	//해당 유저가 예약한 모든 데이터 추출
	findAllUserReservationSchedule = async (memberId) => {
		const findAllUserReservationSchedule = this.prisma.petSitterSchedules.findMany({
			where: { memberId }
		});
		return findAllUserReservationSchedule;
	};

	//해당 유저가 특정 펫시터에게 예약한 예약 테이블 데이터 삭제
	deleteReservation = async (memberId, petSitterId, reserveId) => {
		const deleteReservation = this.prisma.reservations.delete({
			where: {
				reserveId
			}
		});
		return deleteReservation;
	};

	//날짜로 예약 테이블 삭제(벌크 인서트)
	deleteReservationDate = async (willDeleteReservation) => {
		const deleteReservationDate = this.prisma.reservations.deleteMany({
			where: {
				reservationDate: {
					in: willDeleteReservation
				}
			}
		});
		return deleteReservationDate;
	};

	//날짜로 예약테이블 생성(벌크 인서트)
	createReservationDate = async (willCreateReservation) => {
		const createReservationDate = this.prisma.reservations.createMany({
			data: willCreateReservation.map((data) => ({
				petSitterId: data.petSitterId,
				memberId: data.memberId,
				scheduleId: data.scheduleId,
				reservationDate: data.reservationDate,
				status: 'Completed'
			}))
		});
		return createReservationDate;
	};

	//펫시터의 스케줄 수정(벌크인서트)_ 취소
	updateManyCancelPetSitterSchedule = async (petSitterCancelScheduleId) => {
		const updateCancelSchedule = this.prisma.petSitterSchedules.updateMany({
			where: {
				scheduleId: { in: petSitterCancelScheduleId }
			},
			data: {
				status: 'inProgress',
				memberId: null
			}
		});
		return updateCancelSchedule;
	};

	//펫시터의 스케줄 수정(벌크인서트)_ 추가
	updateManyCreatePetSitterSchedule = async (petSitterCreateScheduleId, memberId) => {
		const updateCreateSchedule = this.prisma.petSitterSchedules.updateMany({
			where: {
				scheduleId: { in: petSitterCreateScheduleId }
			},
			data: {
				status: 'Completed',
				memberId
			}
		});
		return updateCreateSchedule;
	};

	//특정 펫시터의 스케줄 수정
	updateSchedule = async (memberId, scheduleId) => {
		const scheduleModifyCancel = this.prisma.petSitterSchedules.update({
			where: { scheduleId },
			data: {
				status: 'inProgress',
				memberId: null
			}
		});
		return scheduleModifyCancel;
	};

	//유저의 현재 예약 조회
	getReservationInfo = async (memberId) => {
		const getReservationInfo = await this.prisma.reservations.findMany({
			where: { memberId }
		});
		return getReservationInfo;
	};
}
