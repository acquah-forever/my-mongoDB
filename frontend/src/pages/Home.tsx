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
        note: string
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
        mutate({ title: data.note, text: "" })
    }



    return (
        <div className=' p-5 flex flex-col justify-center'>
            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Notes App</label>
                <div className="flex flex-col space-y-3">
                    <input className='border rounded-lg p-2 max-w-2xl' type="text" placeholder="Enter Note" {...register("note", { required: "Note is required" })} />

                    {errors.note && <p className='text-red-400 text-sm'>{errors.note.message}</p>}

                    <button className="bg-green-400 p-2 rounded" disabled={isPending}>
                        {isPending ? "Creating..." : "Create Note"}
                    </button>
                </div>
            </form>


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
