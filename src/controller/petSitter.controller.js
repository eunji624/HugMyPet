export class PetSittersController {
	constructor(petSittersService) {
		this.petSittersService = petSittersService;
	}

	findPetSitterList = async (req, res, next) => {
		try {
			const petSittersData = await this.petSittersService.petSittersData();

			res.status(200).json({ success: 'true', data: petSittersData });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
}
