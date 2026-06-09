import "dotenv/config"
import express, { NextFunction, Request } from "express";
import Note from "./models/note";

const app = express();

app.get("/", async (req, res) => {
    try {
        throw Error("trums")
        const notes = await Note.find().exec();
        res.status(200).json(notes);
    } catch (error) {
    }
});

// error handler: define typescript for express error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage })

});

export default app;   