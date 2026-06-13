import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import Note from "./models/note";

const app = express();

app.get("/", async (req, res, next) => {
    try {
        // throw Error("trums")
        const notes = await Note.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
});

// error for handling endpoint not found
app.use((req, res, next) => {
    next(Error("Endpoint not found"))

});
// error for handling errors in created endpoint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage })

}) as express.ErrorRequestHandler);

export default app;   