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
}
