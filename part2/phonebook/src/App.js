import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll()
                 .then((initialPersons => setPersons(initialPersons)))
  }, [])

  const addName = event => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName) &&
        window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {

      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      personService.update(person.id, changedPerson).then(np => {
        setPersons(persons.map(p => p.id !== person.id ? p : np))
      })

    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(personObject)
                   .then(p => setPersons(persons.concat(p)))
    }
    setNewName('')
    setNewNumber('')
  }

  const deletId = id => event => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name}?`))
    {
      personService.delet(id)
                   .then(_ => {
                     setPersons(persons.filter(p => p.id !== id))
                   })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const filterBy = p => p.name.toLowerCase().includes(filter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterBy={filterBy} deletId={deletId}/>
    </div>
  )
}

export default App
