export class PetSittersService {
	constructor(petSittersRepository) {
		this.petSittersRepository = petSittersRepository;
	}

	petSittersData = async () => {
		const petSittersData = await this.petSittersRepository.petSittersData();
		return petSittersData;
	};



	getReservationsByPetsitterId = async (petSitterId) => {
		const reservations = await this.petSittersRepository.findManyreservationsToMe(petSitterId);

		return reservations;
	}
}
