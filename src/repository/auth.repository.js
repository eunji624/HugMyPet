import { prisma } from '../utils/prisma/index.js';

export class AuthRepository {
	//일반유저의 회원가입
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

	//일반유저의 회원 탈퇴
	signOut = async (email) => {
		const user = await prisma.members.delete({
			where: { email }
		});

		return user;
	};

	//유저 정보를 가져옵니다.
	findByEmail = async (email) => {
		const user = await prisma.members.findUnique({
			where: { email }
		});
		return user;
	};
}
