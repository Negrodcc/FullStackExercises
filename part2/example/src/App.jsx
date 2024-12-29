import Note from './components/Note'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('Initial note')
  const [showAll, setShowAll] = useState(true)

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