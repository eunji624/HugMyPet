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
		const scheduleDateArr = req.body.availableDate;
		console.log('scheduleDateArr', scheduleDateArr);

		//트렌젝션 구상
		//펫시터날짜를 가져왔으니 예약과정 진행 전에 펫시터 테이블에 여전히 유효한지 <조회/
		//예약 생성/ 펫시터 스케쥴 변동> 까지 하나의 트랜잭션으로
		//락을 걸면 다른 디비 처리 못하게. 둘다 필요
		//db에서 시터가 허용한 데이터중 날짜값 배열

		//한번에 데이터 조회..
		const stillInProgress = await prisma.petSitterSchedules.findMany({
			where: {
				petSitterId: +petSitterId,
				status: 'inProgress'
			}
		});
		console.log('stillInProgress', stillInProgress);

		const availableDateArr = stillInProgress.map((e) => {
			return { availableDate: e.availableDate, scheduleId: e.scheduleId };
		});
		console.log('availableDateArr', availableDateArr);

		let filterAvailable = availableDateArr.filter((availableDate) => {
			console.log(availableDate.availableDate.getTime());
			return scheduleDateArr.some((scheduleDate) => {
				console.log(new Date(scheduleDate).getTime());
				return availableDate.availableDate.getTime() === new Date(scheduleDate).getTime();
			});
		});
		console.log('filterAvailable', filterAvailable);

		if (!filterAvailable) {
			throw new Error('이미 예약된 날짜입니다.');
		} else if (filterAvailable.length !== scheduleDateArr.length) {
			throw new Error('이미 예약된 날짜입니다.');
		}

		//예약테이블에 데이터 넣기.
		//벌크인서트 한번에 끝내도록. 성능 저하..__createMany?
		let successReservation = [];
		await Promise.all(
			filterAvailable.map(async (e, i) => {
				const newReservation = await prisma.reservations.create({
					data: {
						reservationDate: filterAvailable[i].availableDate,
						petSitterId: +petSitterId,
						memberId: +memberId,
						scheduleId: filterAvailable[i].scheduleId,
						status: 'Completed'
					}
				});
				if (!newReservation) {
					throw new Error('잠시후 다시 예약해 주세요');
				}
				console.log('newReservation', newReservation);
				return successReservation.push(newReservation);
			})
		);

		//펫시터 스케줄 데이터 수정하기
		let petSitterSchedulesData = [];
		await Promise.all(
			filterAvailable.map(async (e) => {
				const updatePetSitterSchedules = await prisma.petSitterSchedules.update({
					where: { scheduleId: +e.scheduleId },
					data: {
						status: 'Completed',
						memberId: +memberId
					}
				});
				if (!updatePetSitterSchedules) {
					throw new Error('잠시후 다시 예약해 주세요');
				}
				console.log('updatePetSitterSchedules', updatePetSitterSchedules);
				return petSitterSchedulesData.push(updatePetSitterSchedules);
			})
		);
		res.status(201).json({
			message: 'success',
			reservationData: [successReservation, petSitterSchedulesData]
		});

		next();
	} catch (err) {
		next(err);
	}
});

//펫시터 수정하기 ___ 펫시터는 동일한데 날짜만 변경가능하도록
router.patch('/contract/:petSitterId', needSignIn, async (req, res, next) => {
	try {
		const { petSitterId } = req.params;
		const { memberId } = res.locals.user;

		//사용자가 입력한 날짜값 배열
		const newInputDateArr = req.body.availableDate;
		console.log('newInputDateArr', newInputDateArr);

		//db에서 유저가 예약한 스케줄 배열
		const currentReservation = await prisma.reservations.findMany({
			where: { memberId: +memberId }
		});
		console.log('currentReservation', currentReservation);

		//아직 가능한 펫시터 시간 배열
		const stillInProgress = await prisma.petSitterSchedules.findMany({
			where: {
				petSitterId: +petSitterId,
				status: 'inProgress'
			}
		});
		console.log('stillInProgress', stillInProgress);
		//아직 가능한 펫시터 시간 배열 가공
		const availableDateArr = stillInProgress.map((e) => {
			return { availableDate: e.availableDate, scheduleId: e.scheduleId };
		});
		console.log('availableDateArr', availableDateArr);

		//여전히 유효한지 검증
		let filterAvailable = availableDateArr.filter((availableDate) => {
			console.log(availableDate.availableDate.getTime());
			return newInputDateArr.some((newInputDate) => {
				console.log(new Date(newInputDate).getTime());
				return availableDate.availableDate.getTime() === new Date(newInputDate).getTime();
			});
		});
		console.log('filterAvailable', filterAvailable);

		//기존에 입력한 날짜데이터를 가져와 프론트에서 띄운다음 사용자가 수정해서 다시 전송.
		//기존에 입력한 데이터에서 새로운 데이터가 있는지 비교
		//새로운 데이터가 예약이 가능한지 비교
		//예약이 가능하다면 예약 불가능 하다면 에러
		//예약진행 후 팻시터 스케줄 조정

		let updateReservationCreate = [];
		let updateReservationDelete = [];
		//현재 예약과 수정 예약 비교 __ 펫시터는 동일한가? 날짜는 동일한가
		currentReservation.map(async (e, i) => {
			for (let j = 0; j < newInputDateArr.length; j++) {
				const samePetSitter = e.petSitterId === +petSitterId;
				const sameReservationDate = e.reservationDate.getTime() === new Date(newInputDateArr[j]).getTime();
				console.log(sameReservationDate, e.reservationDate.getTime(), new Date(newInputDateArr[j]).getTime());
				if (samePetSitter && !sameReservationDate) {
					console.log('시터는 동일하고 날짜만 바뀐 경우');
					//시터는 동일하고 날짜만 바뀐 경우
					//숫자 배열의 비교 12/2 12/3 예약에서  12/3. 12/4로
					//기존 예약, 새예약의 겹치는 부분을 빼고 updateReservationCreate 에 담기,
					const newReservation = new Date(newInputDateArr[j]);
					updateReservationCreate.push(newReservation);
					updateReservationDelete.push(e.reservationDate);

					//날짜만 바꾸고 시터는 동일한 경우
					console.log('updateReservationCreate', updateReservationCreate);
					console.log('updateReservationDelete', updateReservationDelete);

					//기존 예약 삭제
					filterAvailable.forEach(async (filterAvail) => {
						await prisma.reservations.delete({
							where: {
								reservationDate: e.reservationDate,
								memberId: +memberId,
								petSitterId: +petSitterId,
								scheduleId: filterAvail.scheduleId
							}
						});
						await prisma.reservations.create({
							data: {
								scheduleId: filterAvail.scheduleId,
								petSitterId: +petSitterId,
								memberId: +memberId,
								reservationDate: newReservation,
								status: 'inProgress'
							}
						});
						updateReservationCreate.forEach(async (updateAvailableDate) => {
							await prisma.petSitterSchedules.update({
								where: {
									petSitterId: +petSitterId,
									availableDate: updateAvailableDate,
									scheduleId: filterAvail.scheduleId
								},
								data: {
									status: 'Completed',
									memberId: +memberId
								}
							});
						});
						updateReservationDelete.forEach(async (backPetSitterSchedules) => {
							await prisma.petSitterSchedules.update({
								where: {
									petSitterId: +petSitterId,
									availableDate: backPetSitterSchedules,
									scheduleId: filterAvail.scheduleId
								},
								data: {
									status: 'inProgress',
									memberId: null
								}
							});
						});
					});

					return res.json({ message: '성공' });
				} //날짜는 동일한데 시터를 바꾼 경우
				else if (!samePetSitter && sameReservationDate) {
					console.log('날짜는 동일한데 시터를 바꾼 경우');

					return changePetSitter(e.scheduleId, e.reserveId);
				} else if (!samePetSitter && !sameReservationDate) {
					console.log('날짜, 시터 모두 바꾼 경우');

					changePetSitterAndDate();
				}
			}
		});

		//날짜는 동일한데 시터를 바꾼 경우
		// async function changePetSitter(scheduleId, reserveId) {
		// 	console.log('실행중');
		// 	//1.petSitter테이블 변경
		// 	const backPetSitterSchedules = await prisma.petSitterSchedules.update({
		// 		where: { memberId: +memberId, scheduleId: +scheduleId },
		// 		data: {
		// 			memberId: 1,
		// 			status: 'Completed'
		// 		}
		// 	});
		// 	console.log('backPetSitterSchedules', backPetSitterSchedules);
		// 	//2.reservations테이블 변경
		// 	const reservationUpdate = await prisma.reservations.update({
		// 		where: { memberId: +memberId, reserveId: +reserveId },
		// 		data: {
		// 			petSitterId: +petSitterId
		// 		}
		// 	});
		// 	console.log('reservationUpdate', reservationUpdate);

		// 	// //3. petSitter 테이블 다시 변경
		// 	// const newPetSitterSchedules = await prisma.petSitterSchedules.update({
		// 	// 	where: { petSitterId: +petSitterId },
		// 	// 	data: {
		// 	// 		memberId: +memberId,
		// 	// 		status: 'Completed'
		// 	// 	}
		// 	// });
		// 	// console.log('newPetSitterSchedules', newPetSitterSchedules);
		// }

		//날짜와, 시터 모두 다른 경우
		async function changePetSitterAndDate() {}

		next();
	} catch (err) {
		next(err);
	}
});
export default router;
