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
}
