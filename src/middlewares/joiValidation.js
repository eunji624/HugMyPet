import Joi from 'joi';

//회원가입 유효성 검사
const registerValidation = async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().min(2).max(30).required().messages({
			'string.empty': '이름을 입력해 주세요.'
		}),
		email: Joi.string().email().pattern(new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}')).required().messages({
			'string.email': '이메일을 확인해 주세요.',
			'string.empty': '이메일을 입력해 주세요'
		}),
		age: Joi.number().integer().min(10).max(90).required().messages({
			'number.min': '10살 이상, 90살 이하만 가입이 가능합니다.',

			'number.min': '10살 이상, 90살 이하만 가입이 가능합니다.',
			'number.max': '10살 이상, 90살 이하만 가입이 가능합니다.'
		}),
		password: Joi.string().min(6).required().messages({
			'string.empty': '비밀번호를 입력해 주세요',
			'string.min': '비밀번호는 6자리 이상이여야 합니다.'
		}),
		confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
			'any.only': '비밀번호가 일치하지 않습니다.'
		}),
		imagePath: Joi.string().required().messages({
			'string.empty': '이미지를 넣어주세요'
		}),
		//이미지 파일.. 처리..
		// imagePath: Joi.string().dataUri().required().messages({
		// 	'string.dataUri': '이미지 파일의 형식이 올바르지 않습니다.'
		// }),
		address: Joi.string().required().messages({
			'string.empty': '주소를 입력해 주세요'
		})
	});
	try {
		await schema.validateAsync(req.body);
		next();
	} catch (err) {
		const message = err.details[0].message;
		console.log('err', err);
		res.status(400).json({ success: false, message: message });
		next(err);
	}
};

//petSitter 회원가입 유효성 검사
const petSitterRegisterValidation = async (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().min(2).max(30).required().messages({
			'string.empty': '닉네임을 입력해 주세요.'
		}),
		email: Joi.string().email().pattern(new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}')).required().messages({
			'string.email': '이메일을 확인해 주세요.',
			'string.empty': '이메일을 입력해 주세요'
		}),
		age: Joi.number().integer().min(10).max(90).required().messages({
			'number.empty': '나이를 입력해 주세요.',
			'number.min': '10살 이상, 90살 이하만 가입이 가능합니다.',
			'number.max': '10살 이상, 90살 이하만 가입이 가능합니다.'
		}),
		password: Joi.string().min(6).required().messages({
			'string.empty': '비밀번호를 입력해 주세요',
			'string.min': '비밀번호는 6자리 이상이여야 합니다.'
		}),
		confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
			'any.only': '비밀번호가 일치하지 않습니다.'
		}),
		selfIntro: Joi.any().required().messages({
			'string.empty': '자기소개를 작성해 주세요.'
		}),
		availablePet: Joi.string().valid('Dog', 'Cat').required().messages({
			'string.empty': '케어 가능한 펫 종류를 입력해 주세요.'
		}),
		certificate: Joi.string().required().messages({
			'string.empty': '보유하고 계신 자격증 명을 입력해 주세요. 없으시다면 없음 을 입력해 주세요.'
		}),
		imagePath: Joi.string().required().messages({
			'string.empty': '이미지를 넣어주세요'
		}),
		//이미지 파일.. 처리..
		// imagePath: Joi.string().dataUri().required().messages({
		// 	'string.dataUri': '이미지 파일의 형식이 올바르지 않습니다.'
		// }),
		availableAddress: Joi.string().required().messages({
			'string.empty': '주소를 입력해 주세요'
		})
	});
	try {
		await schema.validateAsync(req.body);
		next();
	} catch (err) {
		const message = err.details[0].message;
		console.log('err', err);
		res.status(400).json({ success: false, message: message });
		next(err);
	}
};

//로그인 유효성 검사
const loginValidation = async (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().pattern(new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}')).required().messages({
			'string.email': '이메일을 확인해 주세요.',
			'string.empty': '이메일을 입력해 주세요'
		}),
		password: Joi.string().min(6).required().messages({
			'string.empty': '비밀번호를 입력해 주세요',
			'string.min': '비밀번호는 6자리 이상이여야 합니다.'
		})
	});
	try {
		await schema.validateAsync(req.body);
		next();
	} catch (err) {
		const message = err.details[0].message;
		res.status(400).json({ message });
		next(err);
	}
};

//탈퇴 비번 입력
const signOut = async (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string().min(6).required().messages({
			'string.empty': '비밀번호를 입력해 주세요'
		})
	});
	try {
		await schema.validateAsync(req.body);
		next();
	} catch (err) {
		const message = err.details[0].message;
		next(err);
	}
};

//리뷰 작성 유효성 검사
const createReviewValidation = async (req, res, next) => {
	const schema = Joi.object({
		content: Joi.string().required().messages({
			'string.empty': '내용을 입력해 주세요.'
		}),
		score: Joi.number().max(5).min(0).required().messages({
			'number.empty': '펫 시터에게 평점을 남겨주세요.'
		})
	});
	try {
		await schema.validateAsync(req.body);
		next();
	} catch (err) {
		const message = err.details[0].message;
		res.status(400).json({ message });
		next(err);
	}
};

export { registerValidation, loginValidation, createReviewValidation, signOut, petSitterRegisterValidation };
