import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Initial note')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])


  console.log("render ", notes.length, "notes")


  const addNote = (event) => {
    event.preventDefault()
    const newNoteObject = {
      id: uuidv4(),
      content: newNote,
      important: Math.random() > 0.5
    }
    setNotes(notes.concat(newNoteObject))
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleSetShowAll = () => {
    console.log("setShowAll is now : ", !showAll)
    setShowAll(!showAll)
  }

  const notesToShow = showAll ? notes : notes.filter( note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={handleSetShowAll}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
                  <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} 
        onChange={handleNoteChange} />
        <button type='submit'>
          save
        </button>
      </form >
      <p>{newNote}</p>
    </div>
  )
}


export default App