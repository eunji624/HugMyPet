export class ReviewRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}

	createReview = async (petSitterId, memberId, title, content, score) => {
		const createReview = await this.prisma.petSitterReviews.create({
			data: {
				petSitterId,
				memberId,
				title,
				content,
				score
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

	updateReview = async (reviewId, title, content, score) => {
		const updateReview = await this.prisma.petSitterReviews.update({
			where: { reviewId },
			data: {
				title,
				content,
				score
			}
		});
		return updateReview;
	};

	deleteReview = async (reviewId, title, content, score) => {
		const deleteReview = this.prisma.petSitterReviews.delete({
			where: { reviewId }
		});
		return deleteReview;
	};

	findManyReview = async (petSitterId) => {
		const findManyReview = this.prisma.petSitterReviews.findMany({
			where: { petSitterId }
		});
		return findManyReview;
	};
}
