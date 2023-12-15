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
}
