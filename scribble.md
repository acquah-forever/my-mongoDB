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