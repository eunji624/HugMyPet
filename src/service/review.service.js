export class ReviewService {
	constructor(reviewRepository) {
		this.reviewRepository = reviewRepository;
	}

	createReview = async (petSitterId, memberId, title, content, score) => {
		const createReview = await this.reviewRepository.createReview(petSitterId, memberId, title, content, score);

		return createReview;
	};

	updateReview = async (petSitterId, memberId, reviewId, title, content, score) => {
		const updateReview = await this.reviewRepository.updateReview(reviewId, title, content, score);

		return updateReview;
	};
}
