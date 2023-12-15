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
}
