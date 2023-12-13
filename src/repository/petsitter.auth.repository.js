import { prisma } from '../utils/prisma/index.js';

export class PetsitterAuthRepository {
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
		const newPetsitter = await prisma.userPetSitters.create({
			data: {
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
			}
		});

		return newPetsitter;
	};

	findByEmail = async (email) => {
		const user = await prisma.userPetSitters.findUnique({
			where: { email }
		});

		return user;
	};

	findByUserId = async (userId) => {
		const user = await prisma.userPetSitters.findUnique({
			where: { userId }
		});

		return user;
	};
}
