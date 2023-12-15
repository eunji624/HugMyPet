export class ReviewService {
	constructor(reviewRepository) {
		this.reviewRepository = reviewRepository;
	}

	createReview = async (petSitterId, memberId, title, content, score) => {
		const createReview = await this.reviewRepository.createReview(petSitterId, memberId, title, content, score);

		const getPetSitterScore = await this.reviewRepository.getPetSitterScore(petSitterId);
		const oldScore = getPetSitterScore.score;
		if (oldScore === null) oldScore = 0;
		console.log('oldScore', oldScore);
		const scoreAvg = Math.round((score + oldScore) / 2);
		console.log('scoreAvg', scoreAvg);
		const modifyPetSitterScore = await this.reviewRepository.updatePetSitterScore(petSitterId, scoreAvg);
		return [createReview, modifyPetSitterScore];
	};

	updateReview = async (reviewId, title, content, score) => {
		const updateReview = await this.reviewRepository.updateReview(reviewId, title, content, score);

		return updateReview;
	};

	deleteReview = async (reviewId, title, content, score) => {
		const deleteReview = await this.reviewRepository.deleteReview(reviewId, title, content, score);

		return deleteReview;
	};

	findManyReview = async (petSitterId) => {
		const findManyReview = await this.reviewRepository.findManyReview(petSitterId);

		return findManyReview;
	};
}
