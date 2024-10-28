import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import { notFound } from './app/middlewares/notFound';
import { globalErrorHandler } from './app/middlewares/globalErrorHandeler';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Cars Washing System!!!');
});

app.use(globalErrorHandler);

//Not found
app.use(notFound);
export default app;
