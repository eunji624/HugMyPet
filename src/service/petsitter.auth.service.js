import { PetsitterAuthRepository } from '../repository/petsitter.auth.repository.js';

export class PetsitterAuthService {
	PetsitterAuthRepository = new PetsitterAuthRepository();

	signUp = async (
		email,
		name,
		age,
		password,
		selfIntro,
		availablePet,
		availableAddress,
		certificate,
		imagePath,
		score
	) => {
		const petsitter = await this.PetsitterAuthRepository.signUp(
			email,
			name,
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
			petSitterId: petsitter.petSitterId,
			name: petsitter.name,
			selfIntro: petsitter.selfIntro,
			availablePet: petsitter.availablePet,
			availableAddress: petsitter.availableAddress,
			certificate: petsitter.certificate,
			score: petsitter.score,
			imagePath: petsitter.imagePath,
			cretaedAt: petsitter.createdAt,
			updatedAt: petsitter.updatedAt
		};
	};

	findByEmail = async (email) => {
		const petsitter = await this.PetsitterAuthRepository.findByEmail(email);

		return petsitter;
	};

	findByPetsitterId = async (petsitterId) => {
		const petsitter = await this.PetsitterAuthRepository.findByPetsitterId(petsitterId);

		return petsitter;
	};

	signOut = async (email) => {
		const user = await this.PetsitterAuthRepository.signOut(email);

		return user;
	};
}
