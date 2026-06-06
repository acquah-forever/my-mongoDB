import "dotenv/config"
import express from "express";
import NoteModel from "./models/note"

const app = express();

app.get("/", async (req, res) => {
    const notes = await NoteModel.find().exec()

});

export default app;