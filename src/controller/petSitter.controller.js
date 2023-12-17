export class PetSittersController {
	constructor(petSittersService) {
		this.petSittersService = petSittersService;
	}

	//펫시터의 리스트를 가져옵니다.
	findPetSitterList = async (req, res, next) => {
		try {
			const petSittersData = await this.petSittersService.petSittersData();

			res.status(200).json({ success: 'true', data: petSittersData });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	//펫시터에게 예약된 정보를 가져옵니다.
	getReservations = async (req, res, next) => {
		try {
			const petSitterId = res.locals.user.petsitterId;

			const reservations = await this.petSittersService.getReservationsByPetsitterId(petSitterId);

			return res.status(200).json({ success: true, message: '예약 조회에 성공했습니다.', data: reservations });
		} catch (error) {
			next(error);
		}
	};
}
