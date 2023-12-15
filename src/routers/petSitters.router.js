import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { prisma } from '../utils/prisma/index.js';
import { PetSittersController } from '../controller/petSitter.controller.js';
import { PetSittersService } from '../service/petSitter.service.js';
import { PetSittersRepository } from '../repository/petSitter.repository.js';

import { needSignIn } from '../middlewares/member.login.middleware.js';
const router = express.Router();
dotenv.config();

const petSittersRepository = new PetSittersRepository(prisma);
const petSittersService = new PetSittersService(petSittersRepository);
const petSittersController = new PetSittersController(petSittersService);

//펫시터 리스트
router.get('/', petSittersController.findPetSitterList);

export default router;
