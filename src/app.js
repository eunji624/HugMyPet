import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import router from './routers/index.js';
import { AvailablePet } from '@prisma/client';
import ErrorHandler from './middlewares/ErrorHandler.js';

const port = process.env.PORT;
const app = express();
const __dirname = path.resolve();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', router);
// app.use(ErrorHandler);

app.get('/', async (req, res) => {
	res.render('../views/main.ejs');
});

app.get('/petsitter-sign-in', async (req, res) => {
	res.render('../views/petsitter-sign-in.ejs');
});

app.get('/user-sign-in', async (req, res) => {
	res.render('../views/user-sign-in.ejs');
});

app.get('/member-sign-up', async (req, res) => {
	res.render('../views/member-sign-up.ejs');
});

app.get('/petsitter-sign-up', async (req, res) => {
	const availablePetEnum = Object.keys(AvailablePet);

	res.render('../views/petSitter-sign-up.ejs', { availablePetEnum });
});

app.get('/member-my-profile', async (req, res) => {
	res.render('../views/member-my-profile.ejs');
});

app.get('/petsitter-my-profile', async (req, res) => {
	res.render('../views/petSitter-my-profile.ejs');
});

// 경로 '/'에서 실행
app.get('/pet-sitter/:petsitterId', async (req, res) => {
	res.render('../views/petsitter-detail.ejs', { includeHeader: true });
});

app.use(ErrorHandler);

app.listen(port, () => {
	console.log(port, '번 포트가 열렸어요');
});
