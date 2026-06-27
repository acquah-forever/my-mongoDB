import type { Note as NoteModel } from '../models/note';
import { useQuery, useMutation } from '@tanstack/react-query';


const Home = () => {

    async function getNotes() {
        const res = await fetch("/api/notes");
        if (!res.ok) {
            throw new Error("Network Issues");
        }
        return res.json() as Promise<NoteModel []>;
    };

    type CreateNoteInput = {
        title: string;
        text? : string;
    }

    async function createNote(newNote: CreateNoteInput) {
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(newNote)
        })

        if(!res.ok) {
            throw new Error("Network Issue")
        }

        return res.json() as Promise<NoteModel>;
    }


    const { data: notes, isLoading, isError } = useQuery<NoteModel[]>({
        queryKey: ["notes"],
        queryFn: getNotes,
        staleTime: 1000 * 6
    })

    const { mutate } = useMutation({
        mutationFn: createNote
    })



    return (
        <div>
            {isLoading && <p>Data is Loading...</p>}
            {isError && <p>Something went wrong</p>}

            <ul className='max-w-3xl grid grid-cols-1 sm:grid-cols-2 m-3 gap-5'>
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
