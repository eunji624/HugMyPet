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
	createReview = async (petSitterId, memberId, title, content, score) => {
		const createReview = await this.reviewRepository.createReview(petSitterId, memberId, title, content, score);

		const modifyPetSitterScore = await this.getPetSitterScore(+petSitterId, score);

		return [createReview, modifyPetSitterScore];
	};

	updateReview = async (reviewId, title, content, score) => {
		const updateReview = await this.reviewRepository.updateReview(reviewId, title, content, score);

		const modifyPetSitterScore = await this.getPetSitterScore(+updateReview.petSitterId, score);

		return [updateReview, modifyPetSitterScore];
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
