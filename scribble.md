import { Schema, InferSchemaType, model } from "mongoose"

const Schema = new Schema (
    {
        title: {
            type: string,
            required: true,
        },

        text: {
            type: string,
            required: false
        },

        publication: {
            type: string,
            required: true,
        }
    }
)

type Note = InferSchemaType<typeof Schema>

export default model<Note>