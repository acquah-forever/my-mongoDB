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

            <ul>
                {notes?.map((note) => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.text}</p>
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
