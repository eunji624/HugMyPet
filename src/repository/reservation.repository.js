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
}
