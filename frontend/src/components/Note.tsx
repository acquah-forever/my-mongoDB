import type { Note as NoteModel } from '../models/note'

interface NoteProps {
    note: NoteModel;
}

const Note = ({ note }: NoteProps) => {

    return (
        <section>
            <small>{note._id}</small>
            <h2>{note.title}</h2>
            <p>{note.text}</p>
        </section>
    )
}

export default Note;
