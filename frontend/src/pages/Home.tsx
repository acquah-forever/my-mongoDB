import { useState } from "react"
import type { Note as NoteModel } from '../models/note';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form"
import { type LucideProps } from "lucide-react";
import { Pencil, Trash } from "lucide-react";

const Home = () => {

    async function getNotes() {
        const res = await fetch("/api/notes");
        if (!res.ok) {
            throw new Error("Failed to fetch notes");
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
            throw new Error("Failed to create note")
        }

        return res.json() as Promise<NoteModel>;
    }

    type UpdateNoteInput = {
        noteId: string;
        title: string;
        text: string;
    }


    async function updateNote({ noteId, title, text }: UpdateNoteInput) {
        const res = await fetch(`/api/notes/${noteId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ title, text })
        })

        if (!res.ok) {
            throw new Error("Failed to update note")
        }

        return res.json() as Promise<NoteModel>;


    }

    async function deleteNote(noteId: string) {
        const res = await fetch(`/api/notes/${noteId}`, {
            method: "DELETE",
        })

        if (!res.ok) {
            throw new Error("Failed to delete note")
        }

    }

    const [show, setShow] = useState<boolean>(false)
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<FormValues>({ title: "", text: "", })

    type FormValues = {
        title: string,
        text: string
    }


    const queryClient = useQueryClient();

    const { data: notes, isLoading, isError } = useQuery<NoteModel[]>({
        queryKey: ["notes"],
        queryFn: getNotes,
        staleTime: 1000 * 6
    })

    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            reset();
        },
    });

    const { mutate: updateNoteMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            setEditingNoteId(null);
            setEditForm({ title: "", text: "" });
        },
    })

    const { mutate: deleteNoteMutation } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()

    function onSubmit(data: FormValues) {
        mutate({ title: data.title, text: data.text })
    }

    function handleClick() {
        setShow((prev) => !prev)
    }

    const trashIconProps: LucideProps = {
        size: 25,
        strokeWidth: 2,
    };

    const editIconProps: LucideProps = {
        size: 24,
        strokeWidth: 2,
    };

    function startEditing(note: NoteModel) {
        setEditingNoteId(note._id);
        setEditForm({ title: note.title, text: note.text ?? "" });
    }

    function cancelEditing() {
        setEditingNoteId(null);
        setEditForm({ title: "", text: "" });
    }

    function handleUpdateSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!editingNoteId || !editForm.title.trim()) {
            return;
        }
        updateNoteMutation({ noteId: editingNoteId, title: editForm.title, text: editForm.text});
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

                            <button className="bg-green-400 p-2 rounded">
                                {isPending ? "Creating..." : "Create Note"}
                            </button>
                        </div>
                    </form>
                )
            }
    
            {isLoading && <p>Data is Loading...</p>}
            {isError && <p>Something went wrong</p>}

            <ul className='grid grid-cols-1 sm:grid-cols-2 m-3 gap-5 mt-10'>
                {notes?.map((note) => (
                    <li className='bg-amber-100 border border-slate-500 p-4' key={note._id}>
                        <div className="flex justify-between gap-3">
                            <h2 className='text-2xl font-semibold'>{note.title}</h2>
                            <div className="flex gap-3">
                                <button className="cursor-pointer text-sky-700 hover:text-sky-900 disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => startEditing(note)}>
                                    <Pencil {...editIconProps} />
                                </button>

                                <button type="button" className="cursor-pointer text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50" onClick={() => deleteNoteMutation(note._id)}>
                                    <Trash {...trashIconProps} />
                                </button>
                            </div>
                        </div>

                        <p className='text-lg'>{note.text}</p>
                        <div className='border border-slate-400 mt-7 mb-7'></div>
                        {/* <p className='text-sm'>{createdUpdatedText}</p> */}

                        {editingNoteId === note._id && (
                            <form className="flex flex-col gap-3" onSubmit={handleUpdateSubmit}>
                                <h3 className="font-semibold">Update Note</h3>
                                <input className='border rounded-lg p-2 bg-white' type="text" placeholder="Update title" value={editForm.title} 
                                onChange={(event) => setEditForm((prev) => ({ ...prev, title: event.target.value }))} required />
                                
                                <input className='border rounded-lg p-2 bg-white' type="text" placeholder="Update text" value={editForm.text} 
                                onChange={(event) => setEditForm((prev) => ({ ...prev, text: event.target.value }))} />
                                <div className="flex gap-2">

                                    <button className="bg-green-400 p-2 rounded disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={isUpdating}>
                                        {isUpdating ? "Updating..." : "Update"}
                                    </button>
                                    <button className="bg-slate-300 p-2 rounded" type="button" onClick={cancelEditing} disabled={isUpdating}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
