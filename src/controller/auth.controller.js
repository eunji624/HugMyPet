import { AuthService } from '../service/auth.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRES_IN } from '../constants/security.costant.js';
export class AuthController {
	AuthService = new AuthService();

	signUp = async (req, res, next) => {
		try {
			const { email, name, age, password, confirmPassword, imagePath, address } = req.body;

			if (!email || !password || !age || !confirmPassword || !name || !imagePath || !address) {
				return res.status(400).json({
					success: false,
					message: '빈칸을 채워주세요.'
				});
			}

			if (password !== confirmPassword) {
				return res.status(400).json({
					success: false,
					message: '입력 한 비밀번호가 서로 일치하지 않습니다.'
				});
			}

			if (password.length < 6) {
				return res.status(400).json({
					success: false,
					message: '비밀번호는 최소 6자리 이상입니다.'
				});
			}

			let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
			const isValidEmail = emailValidationRegex.test(email);
			if (!isValidEmail) {
				return res.status(400).json({
					success: false,
					message: '올바른 이메일 형식이 아닙니다.'
				});
			}

			const existedUser = await this.AuthService.findByEmail(email);

			if (existedUser) {
				return res.status(400).json({
					success: false,
					message: '이미 가입 된 이메일입니다.'
				});
			}
			const hashedPassword = bcrypt.hashSync(password, 10);

			const newUser = await this.AuthService.signUp(email, name, age, hashedPassword, imagePath, address);

			return res.status(201).json({
				success: true,
				message: '회원가입에 성공했습니다.',
				data: newUser
			});
		} catch (error) {
			next(error); // error핸들링 미들웨어로 보낸다/
		}
	};

	signIn = async (req, res, next) => {
		try {
			const { email, password } = req.body;

			if ((!email, !password)) {
				return res.status(400).json({
					success: false,
					message: '빈칸을 채워주세요.'
				});
			}

			const user = await this.AuthService.findByEmail(email);
			console.log('user: ', user);
			if (!user) {
				return res.status(404).json({
					success: false,
					message: '사용자가 존재하지 않습니다.'
				});
			}

			const accessToken = jwt.sign(
				{
					memberId: user.memberId,
					name: user.name,
					email: user.email,
					role: 'User'
				},
				'mynameis',
				{
					expiresIn: '1h'
				}
			);
			const isPasswordMatched = bcrypt.compareSync(password, user.password);
			if (!isPasswordMatched) {
				return res.status(400).json({
					message: '비밀번호가 틀립니다.'
				});
			}
			res.header('authorization', `Bearer ${accessToken}`);

			return res.status(200).json({
				success: true,
				message: '로그인에 성공했습니다.',
				data: { accessToken }
			});
		} catch (error) {
			next(error);
		}
	};
}
