import { prisma } from '../utils/prisma/index.js';

export class AuthRepository {
	signUp = async (email, userName, age, password, imagePath, address) => {
		const newUser = await prisma.userMembers.create({
			data: {
				email,
				userName,
				age,
				password,
				imagePath,
				address
			}
		});

		return newUser;
	};

	findByEmail = async (email) => {
		const user = await prisma.userMembers.findUnique({
			where: { email }
		});

		return user;
	};

	findByUserId = async (userId) => {
		const user = await prisma.userMembers.findUnique({
			where: { userId }
		});

		return user;
	};
}
