import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on port', process.env.PORT || 5000);
  });
});
