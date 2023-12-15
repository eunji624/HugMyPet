import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();
dotenv.config();
//펫시터 리스트
router.get('/', async (req, res, next) => {
	// //토큰을 어디로 줄건지 체크
	// const { accessToken } = req.cookies.Authorization;

	// //토큰에 값을 어떻게 줄건지 체크(사용자 맞는지 인증_미들웨어로 빠질 예정)
	// const jwtVerify = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
	// const { userId } = jwtVerify;

	//평점 좋은순으로 시터 보여줌
	const petSittersData = await prisma.PetSitters.findMany({
		select: {
			petSitterId: true,
			name: true,
			// age: true,
			// selfIntro: true,
			availablePet: true,
			availableAddress: true,
			// certificate: true,
			score: true,
			imagePath: true
		},
		orderBy: {
			score: 'desc'
		}
	});
	res.status(200).json({ success: 'true', data: petSittersData });
});

export default router;
