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
		//현재 펫시터의 아이디와, 해당하는 멤버의 예약 테이블에서 멤버가 예약한 펫시터의아이디 값이 같은 경우만 통과.
		//만약 예약 테이블에 멤버가 예약한 펳시터의 아이디가 없다면 에러.
		//같지 않다고 해도 에러

		//해당 멤버가 예약한 펫시터의 정보를 파악
		const findUserReservation = await this.reviewRepository.findUserReservation(memberId);
		const newfindUserReservation = findUserReservation.map((e) => e.petSitterId);
		const reservationPetSitterCorrect = newfindUserReservation.some((e) => e === petSitterId);
		if (!reservationPetSitterCorrect) throw new Error('예약한 펫시터만 리뷰를 남길 수 있습니다.');

		const createReview = await this.reviewRepository.createReview(petSitterId, memberId, content, score);

		const modifyPetSitterScore = await this.getPetSitterScore(+petSitterId, score);

		return [createReview, modifyPetSitterScore];
	};

	updateReview = async (reviewId, title, content, score) => {
		//현재
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
