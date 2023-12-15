export class ReviewController {
	constructor(reviewService) {
		this.reviewService = reviewService;
	}

	createReview = async (req, res, next) => {
		try {
			const { petSitterId } = req.params;
			const { memberId } = res.locals.user;
			const { title, content, score } = req.body;

			const createReview = await this.reviewService.createReview(+petSitterId, +memberId, title, content, score);

			res.status(201).json({ success: true, message: '펫 시터 후기 등록에 성공했습니다.', data: createReview });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//리뷰 수정하기
	updateReview = async (req, res, next) => {
		try {
			const { title, content, score } = req.body;
			// const { title, content, score, reviewId } = req.body;

			//해당 리뷰의 수정버튼 클릭시 해당 div에 숨겨놓았던 reviewId 값이 들어옵니다.
			const reviewId = 3;

			const updateReview = await this.reviewService.updateReview(+reviewId, title, content, score);
			res.status(200).json({ success: true, message: '펫 시터 후기 수정에 성공했습니다.', data: updateReview });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//리뷰 삭제하기
	deleteReview = async (req, res, next) => {
		try {
			const { title, content, score } = req.body;
			// const { title, content, score, reviewId } = req.body;

			//해당 리뷰의 수정버튼 클릭시 해당 div에 숨겨놓았던 reviewId 값이 들어옵니다.
			const reviewId = 3;

			const deleteReview = await this.reviewService.deleteReview(+reviewId, title, content, score);
			res.status(200).json({ success: true, message: '펫 시터 후기 삭제에 성공했습니다.', data: deleteReview });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
}
