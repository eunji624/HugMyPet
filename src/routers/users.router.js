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

//특정 펫시터 조회하기 _ 리뷰테이블, 예약 가능 테이블 보여주기 __ 분리 및 평점 평균
router.get('/:petSitterId', reservationController.findFirstPetSitterData);

//펫시터 예약하기
router.post('/contract/:petSitterId', needSignIn, reservationController.reservationPetSitter);

//펫시터 삭제하기
router.delete('/contract/:petSitterId', needSignIn, reservationController.deleteReservationPetSitter);

//펫시터 예약정보 보여주기
router.get('/contract/check', needSignIn, reservationController.reservationCheck);

//펫시터 수정하기
router.patch('/contract/:petSitterId', needSignIn, reservationController.modifyReservationPetSitter);
export default router;
