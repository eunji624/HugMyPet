import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import router from './routers/index.js';

// import ErrorHandler from './middlewares/ErrorHandler.js';

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

app.use('/api', router);
// app.use(ErrorHandler);

app.listen(port, () => {
  console.log(port, '번 포트가 열렸어요');
});
