import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { prisma } from '../utils/prisma/index.js';
import { ReservationController } from '../controller/reservation.controller.js';
import { ReservationService } from '../service/reservation.service.js';
import { ReservationRepository } from '../repository/reservation.repository.js';
import { needSignIn } from '../middlewares/member.login.middleware.js';
const router = express.Router();
dotenv.config();

const reservationRepository = new ReservationRepository(prisma);
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

//특정 펫시터 조회하기 _ 리뷰테이블, 예약 가능 테이블 보여주기
router.get('/:petSitterId', async (req, res, next) => {
	const { petSitterId } = req.params;
	//ejs includes 이용하면 위에는 시터데이터만, 아래에는 리뷰와 예약가능 테이블만 보여줄수 있겟다.?
	const petSitterData = await prisma.PetSitters.findUnique({
		where: { petSitterId: +petSitterId },
		select: {
			petSitterId: true,
			name: true,
			age: true,
			selfIntro: true,
			availablePet: true,
			availableAddress: true,
			certificate: true,
			score: true,
			imagePath: true,
			PetSitterReviews: {
				select: {
					memberId: true,
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
router.post('/contract/:petSitterId', needSignIn, reservationController.reservationPetSitter);

//펫시터 삭제하기
router.delete('/contract/:petSitterId', needSignIn, reservationController.deleteReservationPetSitter);

//펫시터 수정하기
// router.patch('/contract/:petSitterId', needSignIn, reservationController.modifyReservationPetSitter);
export default router;
