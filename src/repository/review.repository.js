export class ReviewRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}

	//일반유저의 예약정보를 조회합니다.
	findUserReservation = async (memberId) => {
		const findUserReservation = await this.prisma.reservations.findMany({
			where: { memberId }
		});
		return findUserReservation;
	};

	//일반유저의 리뷰를 작성합니다.
	createReview = async (petSitterId, memberId, content, score) => {
		const createReview = await this.prisma.petSitterReviews.create({
			data: {
				petSitterId,
				memberId,
				content,
				score: +score
			}
		});
		return createReview;
	};

	//해당하는 펫시터의 평균 평점을 가져옵니다.
	getPetSitterScore = async (petSitterId) => {
		const getPetSitterScore = await this.prisma.petSitters.findFirst({
			where: { petSitterId },
			select: { score: true }
		});
		return getPetSitterScore;
	};

	//펫시터의 평균 평점을 수정합니다.
	updatePetSitterScore = async (petSitterId, scoreAvg) => {
		const updatePetSitterScore = await this.prisma.petSitters.update({
			where: { petSitterId },
			data: { score: scoreAvg }
		});
		return updatePetSitterScore;
	};

	//일반유저가 남긴 리뷰를 수정합니다.
	updateReview = async (reviewId, content) => {
		const updateReview = await this.prisma.petSitterReviews.update({
			where: { reviewId },
			data: {
				content
			}
		});
		return updateReview;
	};

	//일반유저가 남긴 리뷰를 삭제합니다.
	deleteReview = async (reviewId) => {
		const deleteReview = this.prisma.petSitterReviews.delete({
			where: { reviewId }
		});
		return deleteReview;
	};

	// 리뷰아이디로 리뷰 찾기
	findReviewByReviewId = async (reviewId) => {
		const review = this.prisma.petSitterReviews.findFirst({
			where: { reviewId }
		});

		return review;
	};

	//현재 펫시터에 해당하는 모든 리뷰를 가져옵니다.
	findManyReview = async (petSitterId) => {
		const findManyReview = this.prisma.petSitterReviews.findMany({
			where: { petSitterId },
			select: {
				reviewId: true,
				petSitterId: true,
				memberId: true,
				content: true,
				score: true,
				createdAt: true,
				updatedAt: true,
				Member: {
					select: {
						name: true
					}
				}
			}
		});
		return findManyReview;
	};
}
