import React,{useContext, useEffect, useRef,useState}from 'react'
import noteContext from './context/notes/NoteContext'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
  const {showAlert}=props;
    const context=useContext(noteContext)
    const {notes,getNotes,editNote}=context;
    const ref=useRef(null)
    const navigate=useNavigate()
    const refClose=useRef(null)
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    const handleChange=(e)=>{
        setNote({...note,[e.target.id]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        props.showAlert("Note updated ",'success')
    }
    useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        getNotes()

      }
      else{
        navigate('/login')
      }
      // eslint-disable-next-line
    },[])
    const updateNote=(currentNote)=>{
      ref.current.click()
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

    }
  return (
    <>
   
    {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
{/* form part start */}
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" onChange={handleChange} value={note.etitle} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" name="edescription" onChange={handleChange} value={note.edescription} id="edescription"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" onChange={handleChange}  value={note.etag} aria-describedby="emailHelp"/>
  </div>
 
</form>
{/* form part ends */}
      </div>
      <div className="modal-footer">
        <button type="button"ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5||note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
<div className ="container my-3">
    <h2>Your Notes</h2>
    <div className='row '>
      <div className='container mx-2'>
      {notes.length===0 && 'No notes to display '}
      </div>
      {notes.map((note)=>{
        
        return <Noteitem key={note._id} updateNote={updateNote}  showAlert={showAlert} note={note}/>
        
      })}
     </div>
    </div>
    </>
  )
}

export default Notes
