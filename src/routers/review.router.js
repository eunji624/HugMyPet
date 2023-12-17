import express from 'express';
import dotenv from 'dotenv';

import { prisma } from '../utils/prisma/index.js';
import { ReviewController } from '../controller/review.controller.js';
import { ReviewService } from '../service/review.service.js';
import { ReviewRepository } from '../repository/review.repository.js';

import { needSignIn } from '../middlewares/member.login.middleware.js';
import { createReviewValidation, modifyReviewValidation } from '../middlewares/joiValidation.js';
const router = express.Router();
dotenv.config();

const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

//리뷰 작성
router.post('/', needSignIn, createReviewValidation, reviewController.createReview);

//리뷰 조회하기 (리뷰는 로그인하지 않은 사용자도 예약페이지에서 다 보여지기 때문에 미들웨어 삭제합니다.)
router.get('/', reviewController.findManyReview);

//리뷰 수정
router.patch('/:reviewId', needSignIn, modifyReviewValidation, reviewController.updateReview);

//리뷰 삭제
router.delete('/:reviewId', needSignIn, reviewController.deleteReview);

export default router;
