export class ReservationController {
	constructor(reservationService) {
		this.reservationService = reservationService;
	}

	//펫시터를 예약합니다.
	reservationPetSitter = async (req, res, next) => {
		try {
			const { petSitterId } = req.params;
			const { memberId } = res.locals.user;
			const userSchedule = req.body.availableDate;

			const existPetSitter = await this.reservationService.findFirstPetSitterData(+petSitterId);
			if (!existPetSitter) throw new Error('해당하는 펫 시터를 찾을 수 없습니다.');

			const reservationPetSitter = await this.reservationService.reservationPetSitter(
				+petSitterId,
				userSchedule,
				+memberId
			);

			res.status(201).json({
				success: true,
				message: '펫 시터 예약에 성공하였습니다.',
				data: reservationPetSitter
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//펫시터의 예약을 취소합니다.
	deleteReservationPetSitter = async (req, res, next) => {
		try {
			const { memberId } = res.locals.user;
			const { petSitterId } = req.params;

			const existPetSitter = await this.reservationService.findFirstPetSitterData(+petSitterId);
			if (!existPetSitter) throw new Error('해당하는 펫 시터를 찾을 수 없습니다.');

			const deleteReservation = await this.reservationService.deleteReservation(+memberId, +petSitterId);
			if (!deleteReservation.count) throw new Error('이미 삭제된 예약건입니다.');

			res.status(201).json({ success: true, message: '펫 시터 예약이 취소되었습니다.' });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//펫시터를 예약한 내용을 확인합니다.
	reservationCheck = async (req, res, next) => {
		try {
			const { memberId } = res.locals.user;

			const getReservationInfo = await this.reservationService.getReservationInfo(+memberId);
			res.status(200).json({ success: true, message: '예약하신 정보를 확인합니다.', data: getReservationInfo });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//특정 펫시터에 정보를 조회합니다.
	findFirstPetSitterData = async (req, res, next) => {
		try {
			const { petSitterId } = req.params;
			const existPetSitter = await this.reservationService.findFirstPetSitterData(+petSitterId);
			if (!existPetSitter) throw new Error('해당하는 펫 시터를 찾을 수 없습니다.');

			res.status(200).json({ success: 'true', message: '펫 시터 정보조회에 성공했습니다.', data: existPetSitter });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//펫시터에게 예약한 내용을 수정합니다.
	modifyReservationPetSitter = async (req, res, next) => {
		try {
			const { petSitterId } = req.params;
			const { memberId } = res.locals.user;
			const userSchedule = req.body.availableDate;

			//한번에 데이터 조회..
			const reservationPetSitter = await this.reservationService.modifyReservationPetSitter(
				+petSitterId,
				+memberId,
				userSchedule
			);
			next();
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
}
