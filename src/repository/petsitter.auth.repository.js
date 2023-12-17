import { prisma } from '../utils/prisma/index.js';

export class PetsitterAuthRepository {
	//펫시터 회원가입 입니다.
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

	//펫시터 회원탈퇴 입니다.
	signOut = async (email) => {
		const user = await prisma.petSitters.delete({
			where: { email }
		});

		return user;
	};

	//이메일에 해당하는 펫시터를 찾습니다.
	findByEmail = async (email) => {
		const user = await prisma.petSitters.findUnique({
			where: { email }
		});

		return user;
	};
}
