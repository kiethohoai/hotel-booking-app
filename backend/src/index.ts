import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";

/* DB Connect */
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string).then(() => {
  console.log("🚀Database Connected");
  console.log("🚀ENV:", process.env.NODE_ENV);
});

/* App */
const app = express();
app.use(express.json());

app.use(urlencoded({ extended: true }));
app.use(cors());

/* User Routes */
app.use(`/api/users`, userRoutes);

/* App Run */
app.listen(7000, () => {
  console.log(`🚀Server Running LocalHost:7000`);
});
