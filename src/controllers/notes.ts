import { RequestHandler } from "express";
import Note from "../models/note";
  
export const getNotes: RequestHandler = async (req, res, next) => {
    try {

        const notes = await Note.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}