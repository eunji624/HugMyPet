export class ReviewService {
	constructor(reviewRepository) {
		this.reviewRepository = reviewRepository;
	}

	//펫시터 리뷰 평점 평균 업데이트 함수입니다.
	async updatePetSitterScore(petSitterId, score) {
		const getPetSitterScore = await this.reviewRepository.getPetSitterScore(petSitterId);
		const oldScore = getPetSitterScore.score;
		const scoreAvg = Math.round((score + oldScore) / 2);

		return await this.reviewRepository.updatePetSitterScore(petSitterId, scoreAvg);
	}

	//리뷰를 생성합니다.
	createReview = async (petSitterId, memberId, content, score) => {
		//해당 멤버가 예약한 펫시터의 정보를 파악
		const findUserReservation = await this.reviewRepository.findUserReservation(memberId);
		const newfindUserReservation = findUserReservation.map((e) => e.petSitterId);
		const reservationPetSitterCorrect = newfindUserReservation.some((e) => e === petSitterId);
		if (!reservationPetSitterCorrect) throw new Error('예약한 펫시터만 리뷰를 남길 수 있습니다.');

		//예약한 날짜가 지나야 후기 남길 수 있도록
		const isAfterUserReservation = findUserReservation.map((e) => e.reservationDate);
		const sortUserReservation = isAfterUserReservation.sort((a, b) => a - b); //곧 있을 예약순으로
		const nowDate = new Date();
		const bigOrSmall = nowDate > sortUserReservation[0];
		if (!bigOrSmall) throw new Error('예약하신 날짜가 지나야 리뷰를 남길 수 있습니다.');

		const createReview = await this.reviewRepository.createReview(petSitterId, memberId, content, score);

		const modifyPetSitterScore = await this.updatePetSitterScore(+petSitterId, score);

		return [createReview, modifyPetSitterScore];
	};

	updateReview = async (reviewId, content, memberId) => {
		//유저가 작성한 글이 맞는지 확인

		const findUserReview = await this.reviewRepository.findUserReservation(+memberId);
		if (memberId !== findUserReview[0].memberId) throw new Error('작성자가 아님으로 권한이 없습니다.');

		const updateReview = await this.reviewRepository.updateReview(reviewId, content);
		// const modifyPetSitterScore = await this.updatePetSitterScore(+updateReview.petSitterId);

		// 프론트에서 편하게 쓰기 위해서 아래 유저 정보 부분 삭제했습니다.
		return updateReview;
	};

	deleteReview = async (reviewId, memberId) => {
		//실제로 유저가 작성한게 맞는지 확인.
		const findUserReview = await this.reviewRepository.findUserReservation(+memberId);
		if (memberId !== findUserReview.memberId) throw new Error('작성자가 아님으로 권한이 없습니다.');

		const deleteReview = await this.reviewRepository.deleteReview(reviewId);

		return deleteReview;
	};

	findManyReview = async (petSitterId) => {
		const findManyReview = await this.reviewRepository.findManyReview(petSitterId);

		const joinedReviews = findManyReview.map((review) => ({
			reviewId: review.reviewId,
			petSitterId: review.petSitterId,
			memberId: review.memberId,
			content: review.content,
			score: review.score,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
			name: review.Member.name
		}));

		return joinedReviews;
	};
}
