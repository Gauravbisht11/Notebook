import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
  // let host="https://notebook-api-sepia.vercel.app"
  const host = "http://localhost:5000"
    const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial)


//fetch all notes
const getNotes=async ()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify()
  });
  const json=await response.json()
  setNotes(json)
}






//add a note
const addNote=async (title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag})
  });
  const note=  await response.json(); 
setNotes(notes.concat(note))

}


//delete a note


const deleteNote=async (id)=>{
  await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify()
  });
    const newNote=notes.filter((e)=>{
        return (e._id!==id)
    })
    setNotes(newNote)
}


//edit  a note

const editNote=async (id,title,description,tag)=>{
 let newNotes=JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < notes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
      element.title=title;
      element.description=description;
      element.tag=tag;
      break;
    }
  }
  setNotes(newNotes)
   await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag})
  });
  // const json= await response.json(); 

}

    return (<NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,getNotes,editNote}}>
        {props.children}
    </NoteContext.Provider>)
}
export default NoteState;
