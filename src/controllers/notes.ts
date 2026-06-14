import { RequestHandler } from "express";
import Note from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await Note.find().exec();
        if (!notes) res.status(404).json({ error: "Notes not found" })
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")

        };
        const note = await Note.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        };
        res.status(200).json(note);
    } catch (error) {
        next(error);
    };
};

interface CreateNoteBody {
    title: string,
    text: string,
};

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newNote = await Note.create({
            title: title,
            text: text,
        });

        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};