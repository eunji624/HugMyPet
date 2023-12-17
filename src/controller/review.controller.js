export class ReviewController {
	constructor(reviewService) {
		this.reviewService = reviewService;
	}

	//리뷰 작성하기
	createReview = async (req, res, next) => {
		try {
			// const { petSitterId } = req.params;
			const { petSitterId } = req.query;
			const { memberId } = res.locals.user;
			const { content, score } = req.body;

			const createReview = await this.reviewService.createReview(+petSitterId, +memberId, content, score);

			res.status(201).json({ success: true, message: '펫 시터 후기 등록에 성공했습니다.', data: createReview });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//해당 펫시터 리뷰 전체 조회하기
	findManyReview = async (req, res, next) => {
		try {
			// const { petSitterId } = req.params;
			const { petSitterId } = req.query;

			const petSitterReviews = await this.reviewService.findManyReview(+petSitterId);
			res.status(200).json({ success: true, message: '펫 시터 후기 조회에 성공했습니다.', data: petSitterReviews });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//리뷰 수정하기
	updateReview = async (req, res, next) => {
		try {
			const { reviewId } = req.params;
			const { content, score } = req.body;

			const updateReview = await this.reviewService.updateReview(+reviewId, content, score);
			res.status(200).json({ success: true, message: '펫 시터 후기 수정에 성공했습니다.', data: updateReview });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//리뷰 삭제하기
	deleteReview = async (req, res, next) => {
		try {
			// const { content, score } = req.body;
			const { reviewId } = req.params;

			const deleteReview = await this.reviewService.deleteReview(+reviewId);
			res.status(200).json({ success: true, message: '펫 시터 후기 삭제에 성공했습니다.', data: deleteReview });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
}
