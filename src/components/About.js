import React, { useContext, useEffect } from 'react'
import noteContext from './context/notes/NoteContext'

function About() {
  const a= useContext(noteContext)
 useEffect(()=>{
   a.update()
   // eslint-disable-next-line
 },[])
  return (
    <div>
     
      this  is about {a.state.name} and is {a.state.class}
      
    </div>
  )
}

export default About
