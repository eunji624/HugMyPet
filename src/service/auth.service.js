import { AuthRepository } from '../repository/auth.repository.js';

export class AuthService {
	AuthRepository = new AuthRepository();

	signUp = async (email, userName, age, password, confirmPassword, imagePath, address) => {
		const user = await this.AuthRepository.signUp(email, userName, age, password, confirmPassword, imagePath, address);

		return {
			userId: user.userId,
			userName: user.userName,
			cretaedAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	};

	findByEmail = async (email) => {
		const user = await this.AuthRepository.findByEmail(email);

		return user;
	};

	findByUserId = async (userId) => {
		const user = await this.AuthRepository.findByUserId(userId);

		return user;
	};
}
