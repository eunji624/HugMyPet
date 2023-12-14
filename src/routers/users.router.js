import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../utils/prisma/index.js';
import { needSignIn } from '../middlewares/member.login.middleware.js';
const router = express.Router();
dotenv.config();

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
router.post('/contract/:petSitterId', needSignIn, async (req, res, next) => {
	console.log('999');
	try {
		const { petSitterId } = req.params;
		const { memberId } = res.locals.user;

		//펫시터 스케줄에서 가능한 애들만 선택하면 몰래 숨겨놨던 스케줄ID 값을 바디에 담겨서 옴.
		//(scheduleId, 날짜정보)

		//사용자가 입력한 날짜값 배열
		const scheduleIdArr = req.body.availableDate;
		console.log('scheduleIdArr', scheduleIdArr);

		//트렌젝션 구상
		//펫시터날짜를 가져왔으니 예약과정 진행 전에 펫시터 테이블에 여전히 유효한지 <조회/
		//예약 생성/ 펫시터 스케쥴 변동> 까지 하나의 트랜잭션으로
		//락을 걸면 다른 디비 처리 못하게. 둘다 필요
		//db에서 시터가 허용한 데이터중 날짜값 배열
		const stillInProgress = await prisma.petSitterSchedules.findMany({
			where: {
				petSitterId: +petSitterId,
				status: 'inProgress'
			}
		});
		console.log('stillInProgress', stillInProgress);

		const availableDateArr = stillInProgress.map((e) => {
			return e.availableDate;
		});
		console.log('availableDateArr', availableDateArr);

		let filterAvailable = [];
		availableDateArr.map((availableDate) => {
			return scheduleIdArr.map((scheduleId) => {
				if (availableDate.getTime() === new Date(scheduleId).getTime()) {
					return filterAvailable.push(availableDate);
				}
			});
		});
		console.log('filterAvailable', filterAvailable);

		// if (!filterAvailable) {
		// 	throw new Error('이미 예약된 날짜입니다.');
		// } else if (filterAvailable.length !== scheduleIdArr.length) {
		// 	throw new Error('이미 예약된 날짜입니다.');
		// }
		//벌크인서트 한번에 끝내도록. 성능 저하..포이치
		filterAvailable.forEach(async (e, i) => {
			const newReservation = await prisma.reservations.create({
				data: {
					reservationDate: filterAvailable[i],
					petSitterId: +petSitterId,
					memberId: +memberId,
					status: 'inProgress'
				}
			});
			if (!newReservation) {
				throw new Error('잠시후 다시 예약해 주세요');
			}
			console.log('newReservation', newReservation);
		});

		//벌크인서트 한번에 끝내도록. 성능 저하..포이치
		stillInProgress.forEach(async (e) => {
			const updatePetSitterSchedules = await prisma.petSitterSchedules.update({
				where: { scheduleId: e.scheduleId },
				data: {
					status: 'inProgress',
					memberId: memberId
				}
			});
			if (!updatePetSitterSchedules) {
				throw new Error('잠시후 다시 예약해 주세요');
			}
			console.log('updatePetSitterSchedules', updatePetSitterSchedules);
		});
		res.json({ message: 'success' });

		next();
	} catch (err) {
		next(err);
	}
});

//펫시터 수정하기
// router.post('/contract/:petSitterId', needSignIn, async (req, res, next) => {
// 	try {
// 		const { petSitterId } = req.params;
// 		const { memberId } = res.locals.user;

// 		//펫시터 스케줄에서 가능한 애들만 선택하면 몰래 숨겨놨던 스케줄ID 값을 바디에 담겨서 옴.
// 		//(scheduleId, 날짜정보)

// 		//사용자가 입력한 날짜값 배열
// 		const scheduleIdArr = req.body.availableDate;
// 		console.log('scheduleIdArr', scheduleIdArr);

// 		//트렌젝션 구상
// 		//펫시터날짜를 가져왔으니 예약과정 진행 전에 펫시터 테이블에 여전히 유효한지 <조회/
// 		//예약 생성/ 펫시터 스케쥴 변동> 까지 하나의 트랜잭션으로

// 		//db에서 시터가 허용한 데이터중 날짜값 배열
// 		const stillInProgress = await prisma.petSitterSchedules.findMany({
// 			where: {
// 				petSitterId: +petSitterId,
// 				status: 'inProgress'
// 			}
// 		});
// 		console.log('stillInProgress', stillInProgress);

// 		const availableDateArr = stillInProgress.map((e) => {
// 			return e.availableDate;
// 		});
// 		console.log('availableDateArr', availableDateArr);

// 		let filterAvailable = [];
// 		availableDateArr.map((availableDate) => {
// 			return scheduleIdArr.map((scheduleId) => {
// 				if (availableDate.getTime() === new Date(scheduleId).getTime()) {
// 					return filterAvailable.push(availableDate);
// 				}
// 			});
// 		});
// 		console.log('filterAvailable', filterAvailable);

// 		if (!filterAvailable) {
// 			throw new Error('이미 예약된 날짜입니다.');
// 		} else if (filterAvailable.length !== scheduleIdArr.length) {
// 			throw new Error('이미 예약된 날짜입니다.');
// 		}

// 		// filterAvailable.forEach(async (e, i) => {
// 		// 	const newReservation = await prisma.reservations.update({
// 		// 		data: {
// 		// 			availableDate: filterAvailable[i],
// 		// 			petSitterId: +petSitterId,
// 		// 			memberId: memberId,
// 		// 			status: 'inProgress'
// 		// 		}
// 		// 	});
// 		// 	if (!newReservation) {
// 		// 		throw new Error('잠시후 다시 예약해 주세요');
// 		// 	}
// 		// 	console.log('newReservation', newReservation);
// 		// });

// 		// stillInProgress.forEach(async (e) => {
// 		// 	const updatePetSitterSchedules = await prisma.petSitterSchedules.update({
// 		// 		where: { scheduleId: e.scheduleId },
// 		// 		data: {
// 		// 			status: 'Completed',
// 		// 			memberId: memberId
// 		// 		}
// 		// 	});
// 		// 	if (!updatePetSitterSchedules) {
// 		// 		throw new Error('잠시후 다시 예약해 주세요');
// 		// 	}
// 		// 	console.log('updatePetSitterSchedules', updatePetSitterSchedules);
// 		// });
// 		next();
// 	} catch (err) {
// 		next(err);
// 	}
// });
export default router;
