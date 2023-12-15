import { prisma } from '../utils/prisma/index.js';

export class AuthRepository {
	signUp = async (email, name, age, password, imagePath, address) => {
		const newUser = await prisma.members.create({
			data: {
				email,
				name,
				age,
				password,
				imagePath,
				address
			}
		});

		return newUser;
	};

	signOut = async (email) => {
		const user = await prisma.members.delete({
			where: { email }
		});

		return user;
	};

	findByEmail = async (email) => {
		console.log('email', email);
		const user = await prisma.members.findUnique({
			where: { email }
		});
		console.log('서비스user', user);
		return user;
	};

	findByMemberId = async (memberId) => {
		const user = await prisma.members.findUnique({
			where: { memberId }
		});

		return user;
	};
}
