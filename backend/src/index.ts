import express, { Request, Response, urlencoded } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get(`/api/test`, async (req: Request, res: Response) => {
  res.json({ message: `Hello from Express Endpoint` });
});

app.listen(7000, () => {
  console.log(`Server Running On LocalHost:7000`);
});
