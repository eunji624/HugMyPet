import { PetsitterAuthRepository } from '../repository/petsitter.auth.repository.js';

export class PetsitterAuthService {
	PetsitterAuthRepository = new PetsitterAuthRepository();

	//펫시터가 회원가입 합니다.
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

	//펫시터의 정보를 가져옵니다.
	findByEmail = async (email) => {
		const petsitter = await this.PetsitterAuthRepository.findByEmail(email);

		return petsitter;
	};

	//펫시터가 회원 탈퇴를 합니다.
	signOut = async (email) => {
		const user = await this.PetsitterAuthRepository.signOut(email);

		return user;
	};

	//펫시터의 정보를 가져옵니다.
	myProfile = async (email) => {
		const user = await this.PetsitterAuthRepository.findByEmail(email);

		return {
			petSitterId: user.petSitterId,
			email: user.email,
			name: user.name,
			selfIntro: user.selfIntro,
			availablePet: user.availablePet,
			availableAddress: user.availableAddress,
			certificate: user.certificate,
			score: user.score,
			imagePath: user.imagePath
		};
	};
}
