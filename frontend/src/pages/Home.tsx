import React, { useState } from "react"
import type { Note as NoteModel } from '../models/note';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form"


const Home = () => {


    async function getNotes() {
        const res = await fetch("/api/notes");
        if (!res.ok) {
            throw new Error("Network Issues");
        }
        return res.json() as Promise<NoteModel[]>;
    };

    type CreateNoteInput = {
        title: string;
        text: string;
    }

    async function createNote(newNote: CreateNoteInput) {
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newNote)
        })

        if (!res.ok) {
            throw new Error("Network Issue")
        }

        return res.json() as Promise<NoteModel>;
    }


    const queryClient = useQueryClient();

    const { data: notes, isLoading, isError } = useQuery<NoteModel[]>({
        queryKey: ["notes"],
        queryFn: getNotes,
        staleTime: 1000 * 6
    })

    type FormValues = {
        title: string,
        text: string
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()

    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            reset();
        },
    })

    function onSubmit(data: FormValues) {
        mutate({ title: data.title, text: data.text })
    }

    const [show, setShow] = useState<boolean>(false)

    function handleClick() {
        setShow((prev) => !prev)
    }



    return (
        <div className=' p-5 flex flex-col justify-center'>
            <div>
                <button className="bg-sky-400 p-3 rounded-lg cursor-pointer flex justify-center" onClick={handleClick}>Add New Note</button>
            </div>
            {
                show && (
                    <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="noteapp">Notes App</label>
                        <div className="flex flex-col space-y-3">
                            <input className='border rounded-lg p-2 max-w-2xl' id="note" type="text" placeholder="Enter Title" {...register("title", { required: "Note is required" })} />
                            {errors.title && <p className='text-red-400 text-sm'>{errors.title.message}</p>}
                            <input className='border rounded-lg p-2 max-w-2xl' id="text" type="text" placeholder="Enter Text" {...register("text", { required: "Title is required" })} />
                            {errors.text && <p className='text-red-400 text-sm'>{errors.text.message}</p>}




                            <button className="bg-green-400 p-2 rounded" disabled={isPending}>
                                {isPending ? "Creating..." : "Create Note"}
                            </button>
                        </div>
                    </form>
                )
            }



            {isLoading && <p>Data is Loading...</p>}
            {isError && <p>Something went wrong</p>}

            <ul className='grid grid-cols-1 sm:grid-cols-2 m-3 gap-5'>
                {notes?.map((note) => (
                    <li className='bg-amber-100 border border-slate-500 p-4' key={note._id}>
                        <h2 className='text-2xl font-semibold'>{note.title}</h2>
                        <p className='text-lg'>{note.text}</p>
                        <div className='border border-slate-400 mt-7 mb-7'></div>
                        {/* <p className='text-sm'>{createdUpdatedText}</p> */}

                        <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
