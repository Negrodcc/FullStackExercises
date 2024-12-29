import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('initial name')

  const handleNameChange = (event) => {
    console.log("the new name is : ", event.target.value)
    setNewName(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    //first we need to check that the newName hasn´t already be added 
    const nameDuplicated = persons.some(person => person.name === newName)
    if (nameDuplicated) {
      //if the name is a duplicated name, we thorwn an alert
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      const newPerson = {name: newName}
      console.log("the new persons array is : ", persons.concat(newPerson))
      setPersons(persons.concat(newPerson))
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2> 
      <form onSubmit={handleAddPerson}> 
        <div>
          name: 
          <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <h2>Person's names</h2>
        {persons.map(person => (
                    <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  )
}

export default App