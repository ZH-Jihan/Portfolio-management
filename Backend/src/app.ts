import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoutes';
import router from './app/routers';

const app = express();

app.use(
  cors({
    origin: [
      'https://zh-jihan.vercel.app',
      `${config.frontend_prodution_url}`,
      `${config.frontend_dev_url}`,
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// When server starts and hit root path
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my portfolio API');
});

// Apply router middleware to all routes under '/api'
app.use('/api', router);

// Global Error Handler
app.use(globalErrorHandler);

// handle api not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  notFoundRoute(req, res, next);
});

export default app;
