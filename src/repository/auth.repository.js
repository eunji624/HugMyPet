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
		const user = await prisma.members.findUnique({
			where: { email }
		});

		return user;
	};

	findByMemberId = async (memberId) => {
		const user = await prisma.members.findUnique({
			where: { memberId }
		});

		return user;
	};

	// myProfile = async (email) => {
	// 	const user = await prisma.members.findUnique({
	// 		where: { email }
	// 	});

	// 	return user;
	// };
}
