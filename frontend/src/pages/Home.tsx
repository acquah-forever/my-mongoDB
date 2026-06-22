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

            <ul className='bg-amber-200 max-w-3xl'>
                {notes?.map((note) => (
                    <li className='border border-slate-500' key={note._id}>
                        <h3 className='text-2xl font-semibold'>{note.title}</h3>
                        <p className='text-lg text-purple-600'>{note.text}</p>
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
