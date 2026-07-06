import dotenv/config
import express{ Request, Response, NextFunction} from "express"
import router from "./routes/notes"
import createHTTPError {isHTTPError} from "create-errors"

const app = express();

app.use(express.json());

app.use("/api/movies", routes);

app.use((res, req, next) => {
    next(createHTTPError(404, "Endpoint not found"))
};

app.use((req: Request, res: Response, next: NextFunction)) => {
    let errorMEssage = "An error occured";
    let statusCode = 500;

    if(isHTTPError(error)) {
        statusCode = error.status
        errorMessage = error.message;
    }

    res.status(statusCode).json({error: error.message})
};

export default app;

import app from "./app"
import mongoose from "mongoose"
import env from "./util/validateEnv"

const port = env.PORT;

mongoose.connect(env.MONGOOSE_CONNECTION_STRING){
    .then(() => {
        console.log("Mongo connected successfully")
    })

    app.listen(port, () => {
        console.log(`Port successfully connected on ${port}`)
    })
}
catch(err => {
    console.error(Mongo DB connection failed)
    console.error(err)
})

import {InferSchemaType, Schema, model} from "mongoose";

 const kojoSchema = new Schema(
    {
        title:{
            type:string
            required:true
        },

        body:{
            type:string
            required:true
        }
    }
 );

 type Kojo = InferSchemaType<typeOf kojoSchema>;

 export default model<Kojo>("Kojo", kojoSchema);


 import { RequestHandler } from "express";
 import Kojo form "./models/kojo
 import createHTTPError from "create-errors"
 import mongoose from "mongoose"

 export const getKojos:RequestHandler = async (req, res, next) => {
    try{
    const kojos = await Kojo.find().exec();

    if(!Kojo){
        throw createHTTPError(404,"Kojo not found);
    }
    res.status(400).json(kojos);
    } catch(error){
        next(error)
    }
 };

 export const getKojo:RequestHandler = async (req, res, next ) => {

    const kojoId = req.params.kojoId

    try{

        if(!mongoose.validateObjectById){
            throw createHTTPError(404, "Invalid Id")
        }
        const kojo = await Kojo.findById(kojoId).exec()

        if(!Kojo){
        throw createHTTPError(404,"Kojo not found);

        res.status(400).json(kojo);
    }
    } catch (error) {
        next(error)
    }
 }

 inteface createKojo {
    title: string,
    body: string
 }

 export const createKojo: RequestHandler< unknown, unknown, createKojo, unknown> = async (res, req, next ) => {

    const title = req.body.title;
    const body = req.body.body;

    try {

        if(!title && !body) {
            throw catchHTTPError(404, "Title and Body required");
        }

        const newKojo = await Kojo.create({title, body});

        if(!Kojo){
        throw createHTTPError(404,"Kojo not found);

        res.status(201).json(newKojo);

    } catch (error) {
        next(error)
    }
 }

 interface updateId {
    kojoId: string
 }

 interface updateKojo {
    title: string,
    body: string,
 }

 export const updateKojo:RequestHandler<updaateId, unknown, updateKojo, unknown > = async (res, req, next) => {

    const kojoID = req.params.kojoId;
    const newTitle = req.body.title;
    const newBody = req.body.body;

    try {
        if(!mongoose.validateObjectById){
            throw createHttpError("Invalid object Id")
        }

        if(!title && !body) {
            throw catchHTTPError(404, "Title and Body required");
        }

        const kojo = await Kojo.findById(kojoId).exec()
        
         if(!Kojo){
        throw createHTTPError(404,"Kojo not found);

        res.status(400).json(kojo)

        kojo.title = newTile
        kojo.body = newBody

       const updateKojo =  await note.save()
       res.status(401).json(updateKojoi)

    } catch(error) {
        next(error)
    }

 }