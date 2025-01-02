import { useState, useEffect} from 'react'
import axios from 'axios'


const FilterName = ({filterName, handleFilterName}) => {
  return (
    <>
      filter with name: <input value={filterName} onChange={handleFilterName}/>
    </>
  )
}

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, handleAddPerson}) => {
  return (
    <form onSubmit={handleAddPerson}> 
        <div>
        name: <input value={newName} onChange={handleNameChange}/>
        number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({filter_persons}) => {
  return (
    <div>
      {filter_persons.map(person => (
                  <p key={person.name}>{person.name} {person.number}</p>
      ))}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('initial name')
  const [newNumber, setNewNumber] = useState('+56 9xxxxxxxx')
  const [filterName, setFilterName] = useState('')

  //hook which fetch the initial data persons from the server in localhost:3001
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('the full response is: ', response)
        setPersons(response.data)
    })
  }

  //useEffect only for the first render
  useEffect(hook, [])



  //new Name's handler: Event -> Void
  // set the new name with the value gaven in the input, which is within the form
  const handleNameChange = (event) => {
    console.log("the new name is : ", event.target.value)
    setNewName(event.target.value)
  }

  //new Name's handler: Event -> Void
  // set the new name with the value gaven in the input, which is within the form
  const handleNumberChange = (event) => {
    console.log("the new number is : ", event.target.value)
    setNewNumber(event.target.value)
  }

  //filter name's handler: Event -> Void
  // set the filter name with the value given by the user
  const handleFilterName = (event) => {
    console.log("the filter name is : ", event.target.value)
    setFilterName(event.target.value)
  }

  //Add Person's handler : Event -> Void
  const handleAddPerson = (event) => {
    event.preventDefault()
    //first we need to check that the newName hasn´t already be added 
    const nameDuplicated = persons.some(person => person.name === newName)
    if (nameDuplicated) {
      //if the name is a duplicated name, we thrown an alert
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      //if the name is not duplicated, then we added to the persons array
      const newPerson = {name: newName,
                         number: newNumber}
      console.log("the new persons array is : ", persons.concat(newPerson))
      setPersons(persons.concat(newPerson))
    }
  }

  //Filter persons array
  const filter_persons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterName filterName={filterName} handleFilterName={handleFilterName} />
      <h2>Add a new</h2>
      <h2>Numbers</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} 
                  newNumber={newNumber} handleNumberChange={handleNumberChange} handleAddPerson={handleAddPerson} />
      <Persons filter_persons={filter_persons} />
    </div>
  )
}

export default App