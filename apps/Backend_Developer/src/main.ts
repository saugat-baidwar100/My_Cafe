import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { env } from './Utils/config';

import cookieParser from 'cookie-parser';
import { createDBConnection } from './Utils/db';

import { APIError } from './Utils/error';
import { authRouter } from './Modules/Auth/router';

// import { categoryRouter } from "./modules/Category/router";

// import { categoryRouter } from "./modules/Category/router"

createDBConnection()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

const app = express();

app.use(
  cors({
    // origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Welcome to My_Cafe',
    data: null,
    isSuccess: true,
  });
});

// authentication routes
// app.use("/api/auth", authRouter);

// book routes
// app.use("/api/books", bookRouter);

//Category Routes
// app.use("/api/category",categoryRouter)
//  app.use("/category",categoryRouter)
// app.use('/api/category', categoryRouter());

// app.use('/api/product', productRouter());

app.use('/auth', authRouter());

// app.use('/admin', adminRouter());
// review routes
// app.use("/api/reviews", reviewRouter);

app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  if (error instanceof APIError) {
    res.status(error.status).json({
      message: error.message,
      data: null,
      isSuccess: false,
    });
    return;
  }
  res.status(500).json({
    message: 'Internal server error',
    data: null,
    isSuccess: false,
  });
});

app.listen(env.PORT, () =>
  console.log(`Server started on: http://localhost:${env.PORT}`)
);
