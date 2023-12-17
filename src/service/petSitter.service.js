export class PetSittersService {
	constructor(petSittersRepository) {
		this.petSittersRepository = petSittersRepository;
	}

	//펫시터의 정보를 가져옵니다.
	petSittersData = async () => {
		const petSittersData = await this.petSittersRepository.petSittersData();
		return petSittersData;
	};

	//펫시터에게 예약된 정보를 가져옵니다.
	getReservationsByPetsitterId = async (petSitterId) => {
		const reservations = await this.petSittersRepository.findManyreservationsToMe(petSitterId);

		return reservations;
	};
}
