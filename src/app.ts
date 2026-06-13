import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import router from './routes/notes';

const app = express();

// for sending and receiving json data to our server
app.use(express.json());

// main endpoint
app.use('/api/notes', router);

// error for handling endpoint not found
app.use((req, res, next) => {
    next(Error("Endpoint not found"));

});
// error for handling errors in created endpoint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });

}) as express.ErrorRequestHandler);

export default app;   