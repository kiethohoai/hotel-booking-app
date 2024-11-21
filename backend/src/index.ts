import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

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

/* Routes */
app.get(`/api/test`, async (req: Request, res: Response) => {
  res.json({ message: `Hello from Express Endpoint` });
});

/* App Run */
app.listen(7000, () => {
  console.log(`🚀Server Running LocalHost:7000`);
});
