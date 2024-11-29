import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import myHotelRoutes from './routes/my-hotels';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* DB Connect */
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string).then(() => {
  console.log('🚀Database Connected');
  console.log('🚀ENV:', process.env.NODE_ENV);
});

/* App */
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FONTEND_URL,
    credentials: true,
  }),
);

/* Static Files */
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

/* App Routes */
app.use(`/api/users`, userRoutes);
app.use(`/api/auth`, authRoutes);
app.use(`/api/my-hotel`, myHotelRoutes);

/* App Run */
app.listen(7000, () => {
  console.log(`🚀Server Running LocalHost:7000`);
});
