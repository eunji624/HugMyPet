import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();
dotenv.config();

//특정 펫시터 조회하기 _ 리뷰테이블, 예약 가능 테이블 보여주기
router.get('/petSitters/:petSitterId', async (req, res, next) => {
	const { petSitterId } = req.params;
	//ejs includes 이용하면 위에는 시터데이터만, 아래에는 리뷰와 예약가능 테이블만 보여줄수 있겟다.?
	const petSitterData = await prisma.UserPetSitters.findUnique({
		where: { petSitterId: +petSitterId },
		select: {
			petSitterId: true,
			petSitterName: true,
			age: true,
			selfIntro: true,
			availablePet: true,
			availableAddress: true,
			certificate: true,
			score: true,
			imagePath: true,
			PetSitterReviews: {
				select: {
					userId: true,
					title: true,
					content: true,
					score: true
				}
			}
			// PetSitterSchedules: {
			// 	select: {
			// 		reserveId: true,
			// 		status: true,
			// 		availableDate: true
			// 	}
			// }
		}
	});

	res.status(200).json({ success: 'true', message: '펫 시터 정보조회에 성공했습니다.', data: petSitterData });
});

//펫시터 예약하기
router.post('/petSitters/:petSitterId', async (req, res, next) => {});

export default router;