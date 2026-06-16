import {Schema, InferSchemaType, model} from "mongoose";

const noteSchema = new Schema(
    {
        title:{
            type: string,
            required: true
        },

        text: {
            type: string,
            required:false,
        }
    },
    {
        timestamps: true
    }
);

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema)



import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGOOSE_CONNECTION_STRING);

then(() => {
    console.log("mongoose connected successfully")

    app.listen(port, =>() {
        console.log("mongoose connected on port:" +port)

    })
});

 catch((err) =>{
    console.error("mongoose failed to connect")
    console.error(err)
 });


 import dotenv/config;
 import express { Request, Response, NextFunction} from "express"
 import router from "./routes/notes"
 import createHttpError, { isHttpError} from "http-errors"

 const app = express();

 app.use(express.json());

 app.use("/kojo/booty", router);

 app.use((req, res, next) => {
    next(createHttpError( 404, "Endpoint not found"))
 });

 app.use((error:unknown, req:Request, res:Response, next:NextFunction) => {
    let errorMessage = "An unknown error occured";
    let statusCode = 500;

    if(isHttpError(error)){
        errorMessage: error.message;
        statusCode: error.status;

    }

    res(statusCode).json({error: errorMessage});
 });

 export default app;