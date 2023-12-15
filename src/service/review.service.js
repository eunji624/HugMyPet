export class ReviewService {
	constructor(reviewRepository) {
		this.reviewRepository = reviewRepository;
	}

	createReview = async (petSitterId, memberId, title, content, score) => {
		const createReview = await this.reviewRepository.createReview(petSitterId, memberId, title, content, score);

		//현재 펫시터의 평균평점 가져오기
		const getPetSitterScore = await this.reviewRepository.getPetSitterScore(petSitterId);
		const oldScore = getPetSitterScore.score;
		if (oldScore === null) oldScore = 0;
		const scoreAvg = Math.round((score + oldScore) / 2);

		const modifyPetSitterScore = await this.reviewRepository.updatePetSitterScore(petSitterId, scoreAvg);
		return [createReview, modifyPetSitterScore];
	};

	updateReview = async (petSitterId, reviewId, title, content, score) => {
		const updateReview = await this.reviewRepository.updateReview(reviewId, title, content, score);

		//현재 펫시터의 평균평점 가져오기
		const getPetSitterScore = await this.reviewRepository.getPetSitterScore(petSitterId);
		const oldScore = getPetSitterScore.score;
		const scoreAvg = Math.round((score + oldScore) / 2);

		const modifyPetSitterScore = await this.reviewRepository.updatePetSitterScore(petSitterId, scoreAvg);

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
