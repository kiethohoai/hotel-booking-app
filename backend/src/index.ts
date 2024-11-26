import express, { Request, Response, urlencoded } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';

/* DB Connect */
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string).then(() => {
  console.log('🚀Database Connected');
  console.log('🚀ENV:', process.env.NODE_ENV);
});

/* App */
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FONTEND_URL,
    credentials: true,
  }),
);

/* App Routes */
app.use(`/api/users`, userRoutes);
app.use(`/api/auth`, authRoutes);

/* App Run */
app.listen(7000, () => {
  console.log(`🚀Server Running LocalHost:7000`);
});
