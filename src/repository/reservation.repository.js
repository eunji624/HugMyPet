export class ReservationRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}

	findAllPossibleSchedule = async (petSitterId) => {
		const petSitterPossibleSchedule = this.prisma.petSitterSchedules.findMany({
			where: {
				petSitterId,
				status: 'inProgress'
			}
		});
		return petSitterPossibleSchedule;
	};

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
	deleteReservation = async (memberId, petSitterId) => {
		const deleteReservation = this.prisma.reservations.deleteMany({
			where: {
				memberId,
				petSitterId
			}
		});
		return deleteReservation;
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
}
