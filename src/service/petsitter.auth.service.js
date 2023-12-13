import { PetsitterAuthRepository } from '../repository/petsitter.auth.repository.js';

export class PetsitterAuthService {
	PetsitterAuthRepository = new PetsitterAuthRepository();

	signUp = async (
		email,
		petSitterName,
		age,
		password,
		selfIntro,
		availablePet,
		availableAddress,
		certificate,
		imagePath,
		score
	) => {
		const user = await this.PetsitterAuthRepository.signUp(
			email,
			petSitterName,
			age,
			password,
			selfIntro,
			availablePet,
			availableAddress,
			certificate,
			imagePath,
			score
		);

		return {
			petSitterId: user.petSitterId,
			petSitterName: user.petSitterName,
			selfIntro: user.selfIntro,
			availablePet: user.availablePet,
			availableAddress: user.availableAddress,
			certificate: user.certificate,
			score: user.score,
			imagePath: user.imagePath,
			cretaedAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	};

	findByEmail = async (email) => {
		const user = await this.PetsitterAuthRepository.findByEmail(email);

		return user;
	};

	findByUserId = async (userId) => {
		const user = await this.PetsitterAuthRepository.findByUserId(userId);

		return user;
	};
}
