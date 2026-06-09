import "dotenv/config"
import express from "express";
import Note from "./models/note";

const app = express();

app.get("/", async (req, res) => {
    const notes = await Note.find().exec();
    res.status(200).json(notes);

});

export default app;   