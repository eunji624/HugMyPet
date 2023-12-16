export class ReviewService {
	constructor(reviewRepository) {
		this.reviewRepository = reviewRepository;
	}

	//리뷰 평점 평균 구하는 함수입니다.
	async getPetSitterScore(petSitterId, score) {
		const getPetSitterScore = await this.reviewRepository.getPetSitterScore(petSitterId);
		const oldScore = getPetSitterScore.score;
		const scoreAvg = Math.round((score + oldScore) / 2);

		return await this.reviewRepository.updatePetSitterScore(petSitterId, scoreAvg);
	}

	//리뷰를 생성합니다.
	createReview = async (petSitterId, memberId, content, score) => {
		const createReview = await this.reviewRepository.createReview(petSitterId, memberId, content, score);

		const modifyPetSitterScore = await this.getPetSitterScore(+petSitterId, score);

		return [createReview, modifyPetSitterScore];
	};

	updateReview = async (reviewId, content, score) => {
		const updateReview = await this.reviewRepository.updateReview(reviewId, content, score);

		const modifyPetSitterScore = await this.getPetSitterScore(+updateReview.petSitterId, score);

		return [updateReview, modifyPetSitterScore];
	};

	deleteReview = async (reviewId) => {
		const deleteReview = await this.reviewRepository.deleteReview(reviewId);

		return deleteReview;
	};

	findManyReview = async (petSitterId) => {
		const findManyReview = await this.reviewRepository.findManyReview(petSitterId);

		const joinedReviews = findManyReview.map(review => ({
			reviewId: review.reviewId,
			petSitterId: review.petSitterId,
			memberId: review.memberId,
			content: review.content,
			score: review.score,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
			name: review.Member.name
		}))

		return joinedReviews
	};
}
