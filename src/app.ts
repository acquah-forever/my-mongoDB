import "dotenv/config"
import express from "express";
import Note from "./models/note";

const app = express();

app.get("/", async (req, res) => {
    try {
        const notes = await Note.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        let errorMessage = "An unknown error occured";
        if(error instanceof Error) errorMessage = error.message;
        res.status(500).json({error:errorMessage})
    }
});

export default app;   