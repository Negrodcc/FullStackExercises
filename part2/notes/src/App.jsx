import Note from './components/Note'
import noteService from './services/notes'
import { useState, useEffect } from 'react'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Initial note')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()
    const newNoteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    
    //write the new data with axios
    noteService
    .create(newNoteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
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

  //toggleImportanceOf :: String -> Void
  //functions that toggle the important field in the note with the given id
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id == id)
    const updateNote = {...note, important : !note.important}
    noteService
    .update(id, updateNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch( () => {
      alert(`the note : ${note.content} doesn't exist in the server`)
      setNotes(notes.filter(n => n.id != id))
    })
  }

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
                  <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} 
        onChange={handleNoteChange} />
        <button type='submit'>
          save
        </button>
      </form >
    </div>
  )
}


export default App