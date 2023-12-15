export class ReservationController {
	constructor(reservationService) {
		this.reservationService = reservationService;
	}

	reservationPetSitter = async (req, res, next) => {
		try {
			const { petSitterId } = req.params;
			const { memberId } = res.locals.user;
			const userSchedule = req.body.availableDate;

			const reservationPetSitter = await this.reservationService.reservationPetSitter(
				+petSitterId,
				userSchedule,
				+memberId
			);

			res.status(201).json({
				success: true,
				message: '펫 시터 예약에 성공하였습니다.',
				data: reservationPetSitter
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	// deleteReservationPetSitter = async (req, res, next) => {
	// 	try {
	// 		const { memberId } = req.user.locals;
	// 		const { petSitterId } = req.params;

	// 		const deleteReservation = await this.reservationService.deleteReservation(+memberId, +petSitterId);
	// 		res.status(201).json({ success: true, message: '펫 시터 예약이 취소되었습니다.' });
	// 	} catch (err) {
	// 		console.log(err);
	// 		next(err);
	// 	}
	// };

	// modifyReservationPetSitter = async (req, res, next) => {
	// 	try {
	// 		const { petSitterId } = req.params;
	// 		const { memberId } = res.locals.user;
	// 		const userSchedule = req.body.availableDate;

	// 		//한번에 데이터 조회..
	// 		const reservationPetSitter = await this.reservationService.modifyReservationPetSitter(
	// 			+petSitterId,
	// 			+memberId,
	// 			userSchedule
	// 		);

	// 		let updateReservationCreate = [];
	// 		let updateReservationDelete = [];
	// 		//현재 예약과 수정 예약 비교 __ 펫시터는 동일한가? 날짜는 동일한가
	// 		currentReservation.map(async (e, i) => {
	// 			for (let j = 0; j < userSchedule.length; j++) {
	// 				const samePetSitter = e.petSitterId === +petSitterId;
	// 				if (!samePetSitter) throw new Error('시터를 변경하시려면 예약 취소후 시도해 주세요.');

	// 				//현재 예약과, 새로 입력한 예약이 동일한지
	// 				const sameReservationDate = e.reservationDate.getTime() === new Date(userSchedule[j]).getTime();
	// 				if (!sameReservationDate) {
	// 					//어떤게 새로운 예약이고, 어떤게 취소되어야 할 예약인지 구별

	// 					const newReservation = new Date(userSchedule[j]);
	// 					updateReservationCreate.push(newReservation);
	// 					updateReservationDelete.push(e.reservationDate);
	// 				}
	// 				//같은 예약인 경우에는 안건드려도 됨.
	// 				console.log(sameReservationDate, e.reservationDate.getTime(), new Date(userSchedule[j]).getTime());
	// 			}
	// 		});

	// 		//기존 예약 삭제
	// 		await prisma.reservations.delete({
	// 			where: {
	// 				memberId: +memberId,
	// 				petSitterId: +petSitterId,
	// 				scheduleId: +e.scheduleId
	// 			}
	// 		});
	// 		filterAvailable.map(async (filterAvail) => {
	// 			console.log(+memberId, +petSitterId, +e.scheduleId);
	// 			await prisma.reservations.create({
	// 				data: {
	// 					scheduleId: filterAvail.scheduleId,
	// 					petSitterId: +petSitterId,
	// 					memberId: +memberId,
	// 					reservationDate: newReservation,
	// 					status: 'inProgress'
	// 				}
	// 			});
	// 			//수정 하는 예약데이터 (새로운거) 스케줄에 적용
	// 			updateReservationCreate.forEach(async (updateAvailableDate) => {
	// 				console.log('새로운거');
	// 				await prisma.petSitterSchedules.update({
	// 					where: {
	// 						petSitterId: +petSitterId,
	// 						availableDate: updateAvailableDate,
	// 						scheduleId: filterAvail.scheduleId
	// 					},
	// 					data: {
	// 						status: 'Completed',
	// 						memberId: +memberId
	// 					}
	// 				});
	// 			});
	// 			//수정 하는 예약데이터 (삭제하는거) 스케줄에 적용
	// 			updateReservationDelete.forEach(async (backPetSitterSchedules) => {
	// 				console.log('이전거 삭제');

	// 				await prisma.petSitterSchedules.update({
	// 					where: {
	// 						petSitterId: +petSitterId,
	// 						availableDate: backPetSitterSchedules,
	// 						scheduleId: +e.scheduleId
	// 					},
	// 					data: {
	// 						status: 'inProgress',
	// 						memberId: null
	// 					}
	// 				});
	// 			});
	// 		});

	// 		const modifyReservationResult = await prisma.reservations.findMany({ where: { memberId: +memberId } });
	// 		res.status(201).json({
	// 			success: true,
	// 			message: '펫시터 예약 수정에 성공했습니다.',
	// 			data: modifyReservationResult
	// 		});
	// 		next();
	// 	} catch (err) {
	// 		console.log(err);
	// 		next(err);
	// 	}
	// };
}

//
//
//

//
//
//

// try {
//   const { petSitterId } = req.params;
//   const { memberId } = res.locals.user;
//   const userSchedule = req.body.availableDate;

//   //한번에 데이터 조회..
//   const reservationPetSitter = await this.reservationService.modifyReservationPetSitter(
//     +petSitterId,
//     +memberId,
//     userSchedule
//   );

//   //db에서 유저가 예약한 스케줄 배열
//   const currentReservation = await prisma.reservations.findMany({
//     where: { memberId: +memberId }
//   });
//   console.log('currentReservation', currentReservation);

//   //아직 가능한 펫시터 시간 배열
//   const stillInProgress = await prisma.petSitterSchedules.findMany({
//     where: {
//       petSitterId: +petSitterId,
//       status: 'inProgress'
//     }
//   });
//   console.log('stillInProgress', stillInProgress);
//   //아직 가능한 펫시터 시간 배열 가공
//   const availableDateArr = stillInProgress.map((e) => {
//     return { availableDate: e.availableDate, scheduleId: e.scheduleId };
//   });
//   console.log('availableDateArr', availableDateArr);

//   //여전히 유효한지 검증
//   let filterAvailable = availableDateArr.filter((availableDate) => {
//     console.log(availableDate.availableDate.getTime());
//     return userSchedule.some((newInputDate) => {
//       console.log(new Date(newInputDate).getTime());
//       return availableDate.availableDate.getTime() === new Date(newInputDate).getTime();
//     });
//   });
//   console.log('filterAvailable', filterAvailable);

//   //기존에 입력한 날짜데이터를 가져와 프론트에서 띄운다음 사용자가 수정해서 다시 전송.
//   //기존에 입력한 데이터에서 새로운 데이터가 있는지 비교
//   //새로운 데이터가 예약이 가능한지 비교
//   //예약이 가능하다면 예약 불가능 하다면 에러
//   //예약진행 후 팻시터 스케줄 조정

//   let updateReservationCreate = [];
//   let updateReservationDelete = [];
//   //현재 예약과 수정 예약 비교 __ 펫시터는 동일한가? 날짜는 동일한가
//   currentReservation.map(async (e, i) => {
//     for (let j = 0; j < userSchedule.length; j++) {
//       const samePetSitter = e.petSitterId === +petSitterId;
//       const sameReservationDate = e.reservationDate.getTime() === new Date(userSchedule[j]).getTime();
//       console.log(sameReservationDate, e.reservationDate.getTime(), new Date(userSchedule[j]).getTime());
//       if (!samePetSitter) {
//         throw new Error('시터를 변경하시려면 예약 취소후 시도해 주세요.');
//       } else {
//         const newReservation = new Date(userSchedule[j]);
//         updateReservationCreate.push(newReservation);
//         updateReservationDelete.push(e.reservationDate);
//       }
//     }
//   });

//   //기존 예약 삭제
//   await prisma.reservations.delete({
//     where: {
//       memberId: +memberId,
//       petSitterId: +petSitterId,
//       scheduleId: +e.scheduleId
//     }
//   });
//   filterAvailable.map(async (filterAvail) => {
//     console.log(+memberId, +petSitterId, +e.scheduleId);
//     await prisma.reservations.create({
//       data: {
//         scheduleId: filterAvail.scheduleId,
//         petSitterId: +petSitterId,
//         memberId: +memberId,
//         reservationDate: newReservation,
//         status: 'inProgress'
//       }
//     });
//     //수정 하는 예약데이터 (새로운거) 스케줄에 적용
//     updateReservationCreate.forEach(async (updateAvailableDate) => {
//       console.log('새로운거');
//       await prisma.petSitterSchedules.update({
//         where: {
//           petSitterId: +petSitterId,
//           availableDate: updateAvailableDate,
//           scheduleId: filterAvail.scheduleId
//         },
//         data: {
//           status: 'Completed',
//           memberId: +memberId
//         }
//       });
//     });
//     //수정 하는 예약데이터 (삭제하는거) 스케줄에 적용
//     updateReservationDelete.forEach(async (backPetSitterSchedules) => {
//       console.log('이전거 삭제');

//       await prisma.petSitterSchedules.update({
//         where: {
//           petSitterId: +petSitterId,
//           availableDate: backPetSitterSchedules,
//           scheduleId: +e.scheduleId
//         },
//         data: {
//           status: 'inProgress',
//           memberId: null
//         }
//       });
//     });
//   });

//   const modifyReservationResult = await prisma.reservations.findMany({ where: { memberId: +memberId } });
//   res.status(201).json({
//     success: true,
//     message: '펫시터 예약 수정에 성공했습니다.',
//     data: modifyReservationResult
//   });
//   next();
// } catch (err) {
//   console.log(err);
//   next(err);
// }
