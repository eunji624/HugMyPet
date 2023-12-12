import express from "express"
import cookieParser from "cookie-parser";

import scheduleRouter from "./router/petsitter.schedule.router.js";

import dotenv from 'dotenv'; // .env 패키지를 사용하기 위해 불러오고 실행함
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', (req, res) => {
//   res.send('HelloWorld');
// });

app.use('/api', [scheduleRouter]);


app.listen(port, () => {
  console.log(port, '포트 연결 성공 !');
})

