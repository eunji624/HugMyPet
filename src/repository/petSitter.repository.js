export class PetSittersRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}

	//펫시터의 정보를 가져옵니다.
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

	//예약테이블에서 펫시터와 일치하는 데이터를 가져옵니다.
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
		return reservations;
	};
}
