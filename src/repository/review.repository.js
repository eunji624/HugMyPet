export class ReviewRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}

	findUserReservation = async (memberId) => {
		const findUserReservation = await this.prisma.reservations.findMany({
			where: { memberId }
		});
		return findUserReservation;
	};

	createReview = async (petSitterId, memberId, content, score) => {
		const createReview = await this.prisma.petSitterReviews.create({
			data: {
				petSitterId,
				memberId,
				content,
				score: +score
			}
		});
		return createReview;
	};

	getPetSitterScore = async (petSitterId) => {
		const getPetSitterScore = await this.prisma.petSitters.findFirst({
			where: { petSitterId },
			select: { score: true }
		});
		return getPetSitterScore;
	};

	updatePetSitterScore = async (petSitterId, scoreAvg) => {
		const updatePetSitterScore = await this.prisma.petSitters.update({
			where: { petSitterId },
			data: { score: scoreAvg }
		});
		return updatePetSitterScore;
	};

	updateReview = async (reviewId, content, score) => {
		const updateReview = await this.prisma.petSitterReviews.update({
			where: { reviewId },
			data: {
				content,
				score
			}
		});
		return updateReview;
	};

	deleteReview = async (reviewId) => {
		const deleteReview = this.prisma.petSitterReviews.delete({
			where: { reviewId }
		});
		return deleteReview;
	};

	findManyReview = async (petSitterId) => {
		const findManyReview = this.prisma.petSitterReviews.findMany({
			where: { petSitterId },
			select: {
				reviewId: true,
				petSitterId: true,
				memberId: true,
				content: true,
				score: true,
				createdAt: true,
				updatedAt: true,
				Member: {
					select: {
						name: true
					}
				}
			}
		});
		return findManyReview;
	};
}
