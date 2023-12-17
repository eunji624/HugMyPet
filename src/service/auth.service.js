import { AuthRepository } from '../repository/auth.repository.js';

export class AuthService {
	AuthRepository = new AuthRepository();

	//일반유저가 회원가입 합니다.
	signUp = async (email, name, age, password, confirmPassword, imagePath, address) => {
		const user = await this.AuthRepository.signUp(email, name, age, password, confirmPassword, imagePath, address);

		return {
			memberId: user.memberId,
			name: user.name,
			cretaedAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	};

	//일반유저의 정보를 조회 합니다.
	findByEmail = async (email) => {
		const user = await this.AuthRepository.findByEmail(email);

		return user;
	};

	//일반유저가 회원 탈퇴를 합니다.
	signOut = async (email) => {
		const user = await this.AuthRepository.signOut(email);

		return user;
	};

	//일반유저의 정보를 조회합니다.
	myProfile = async (email) => {
		const user = await this.AuthRepository.findByEmail(email);

		return {
			memberId: user.memberId, // 댓글에서 본인이 작성한 것을 확인할 때 사용되어 추가
			email: user.email,
			name: user.name,
			age: user.age,
			address: user.address,
			imagePath: user.imagePath
		};
	};
}
