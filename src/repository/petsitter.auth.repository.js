import { prisma } from '../utils/prisma/index.js';

export class PetsitterAuthRepository {
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
		const newPetsitter = await prisma.petSitters.create({
			data: {
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
			}
		});

		return newPetsitter;
	};

	signOut = async (email) => {
		const user = await prisma.petSitters.delete({
			where: { email }
		});

		return user;
	};

	findByEmail = async (email) => {
		const user = await prisma.petSitters.findUnique({
			where: { email }
		});

		return user;
	};

	findByPetsitterId = async (petsitterId) => {
		const user = await prisma.petSitters.findUnique({
			where: { petsitterId }
		});

		return user;
	};
}
