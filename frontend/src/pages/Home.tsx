import type { Note as NoteModel } from '../models/note';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
    async function getNotes() {
        const res = await fetch("/api/notes");
        if (!res.ok) {
            throw new Error("Network Issues");
        }
        return res.json() as Promise<NoteModel[]>;
    };


    const { data: notes, isLoading, isError } = useQuery<NoteModel[]>({
        queryKey: ["notes"],
        queryFn: getNotes,
        staleTime: 1000 * 5
    })



    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong</p>}

            <ul className='max-w-3xl grid grid-cols-2 m-3 gap-5'>
                {notes?.map((note) => (
                    <li className='border border-slate-500 p-4' key={note._id}>
                        <h3 className='text-2xl font-semibold'>{note.title}</h3>
                        <p className='text-lg'>{note.text}</p>
                        <div className='border border-slate-300 mt-7 mb-7'></div>
                        <p className='text-sm'>{note.createdAt}</p>

                        <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
