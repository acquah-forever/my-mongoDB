/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import router from './routes/notes';
import userRouter from "./routes/user";
import createHttpError, {isHttpError} from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

// middleware for sending and receiving json data on server
app.use(express.json());

// middleware for user authentication
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
  rolling: true, // Reset the cookie expiration time on every request
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING,
    collectionName: "sessions",
  }),
}));

//router for main endpoint
app.use('/api/notes', router);

app.use("/api/users", userRouter);

// middleware error for handling endpoint not found
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));

});
// middleware for handling errors in created endpoint
// eslint-disable-next-line @typescript-eslint/no-unused-vars

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;   