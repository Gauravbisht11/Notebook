import React, { useContext, useState } from 'react'
import noteContext from './context/notes/NoteContext'

function Addnote(props) {
  const context = useContext(noteContext)
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value })
  }
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({ title: "", description: "", tag: "" })
    props.showAlert('Note added successfully','success')
  }
  return (
    <div>
      <div className='container my-2'>
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={note.title} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" onChange={handleChange} value={note.description} id="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} value={note.tag} aria-describedby="emailHelp" />
          </div>
          <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary " onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default Addnote
