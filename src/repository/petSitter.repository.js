export class PetSittersRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}

	petSittersData = async () => {
		const petSittersData = await this.prisma.petSitters.findMany({
			select: {
				petSitterId: true,
				name: true,
				selfIntro: true,
				availablePet: true,
				availableAddress: true,
				score: true,
				imagePath: true
			},
			orderBy: { score: 'desc' }
		});
		return petSittersData;
	};

	findManyreservationsToMe = async (petSitterId) => {
		const reservations = await this.prisma.reservations.findMany({
			where: { petSitterId },
			select: {
				reserveId: true,
				petSitterId: true,
				memberId: true,
				createdAt: true,
				reservationDate: true,
				Member: {
					select: {
						name: true,
						email: true
					}
				}
			}
		});
		return reservations
	}
}
