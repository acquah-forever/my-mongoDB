import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
    async function getNotes(){
        const res = await fetch("/api/notes");
        if(!res.ok){
            throw new Error("Network Issues");
        }
        return res.json() as Promise<Note []>;
    };

    interface Note {

        _id: string,
        title: string,
        text: string,
        createdAt: string,
        updatedAt: string,
    };

    const{data:notes, isLoading, isError} = useQuery<Note []>({
        queryKey: ["notes"],
        queryFn: getNotes,
        staleTime: 1000 * 5
    })



    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong</p>}

            {JSON.stringify(notes)}
        </div>
    )
}

export default Home
