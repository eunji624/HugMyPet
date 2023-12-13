import jwt from 'jsonwebtoken';
import { AuthService } from '../service/auth.service.js';

export const needSignin = async (req, res, next) => {
	const authService = new AuthService();
	try {
		const { authorization } = req.headers;
		// headers로 하면 안 들어옴

		const [tokenType, accessToken] = authorization.split(' ');

		if (tokenType !== 'Bearer') {
			return res.status(400).json({
				success: false,
				message: '지원하지 않는 인증 방식입니다.'
			});
		}

		if (!accessToken) {
			return res.status(400).json({
				success: false,
				message: 'AccessToken이 없습니다.'
			});
		}

		const decodedPayload = jwt.verify(accessToken, 'mynameis');
		const { memberId } = decodedPayload;

		const user = await authService.findByMemberId(memberId);

		res.locals.user = user;

		next();
	} catch (error) {
		// 검증에 실패한 경우
		console.error(error);

		let statusCode = 500;
		let errorMessage = '';

		switch (error.message) {
			case 'jwt expired':
				statusCode = 401;
				errorMessage = '인증 정보 유효기간이 지났습니다.';
				break;
			case 'invalid signature':
				statusCode = 401;
				errorMessage = '유효하지 않는 인증 정보입니다.';
				break;
			default:
				statusCode = 500;
				errorMessage = '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.';
				break;
		}

		return res.status(statusCode).json({
			success: false,
			message: errorMessage
		});
	}
};
