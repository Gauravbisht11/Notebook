import React ,{useContext}from 'react'
import noteContext from './context/notes/NoteContext'
function Noteitem(props) {
    const {note,updateNote}=props
    const context=useContext(noteContext)
    const {deleteNote}=context
  return (
      <div className="col-md-3 my-2">
      <div className="card" >
  <div className="card-body">
    <div className='d-flex align-items-center'>
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully",'danger')}}  style={{cursor:"pointer"}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} style={{cursor:"pointer"}}></i>
    </div>
    <p className="card-text">{note.description}</p>
    
  </div>
</div>
    </div>
  )
}

export default Noteitem
