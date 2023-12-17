import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const needSignIn = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const [tokenType, accessToken] = authorization.split(' ');

		if (tokenType !== 'Bearer') throw new Error('지원하지 않는 인증 방식입니다.');
		if (!accessToken) throw new Error('AccessToken이 없습니다.');

		const userVerify = jwt.verify(accessToken, process.env.JWT_SECRET);
		res.locals.user = userVerify;
		next();
	} catch (error) {
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
