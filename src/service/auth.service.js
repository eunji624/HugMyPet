import { AuthRepository } from '../repository/auth.repository.js';

export class AuthService {
	AuthRepository = new AuthRepository();

	signUp = async (email, name, age, password, confirmPassword, imagePath, address) => {
		const user = await this.AuthRepository.signUp(email, name, age, password, confirmPassword, imagePath, address);

		return {
			memberId: user.memberId,
			name: user.name,
			cretaedAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	};

	findByEmail = async (email) => {
		const user = await this.AuthRepository.findByEmail(email);

		return user;
	};

	findByMemberId = async (memberId) => {
		const user = await this.AuthRepository.findByMemberId(memberId);

		return user;
	};

	signOut = async (email) => {
		const user = await this.AuthRepository.signOut(email);

		return user;
	};

	myProfile = async (email) => {
		const user = await this.AuthRepository.findByEmail(email);

		return {
			email: user.email,
			name: user.name,
			age: user.age,
			address: user.address,
			imagePath: user.imagePath
		};
	};
}
