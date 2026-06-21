import type { Note as NoteModel } from '../models/note'

interface NoteProps {
    note: NoteModel;
}

const Note = ({ note }: NoteProps) => {

    return (
        <section>
            <div>
                <small>{note._id}</small>
                <h2>{note.title}</h2>
                <p>{note.text}</p>
            </div>
        </section>
    )
}

export default Note;
