import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(['error', null])

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
        setMessage(['success', `Updated ${person.name}`])
        setTimeout(() => setMessage(['',null]), 3000)
      }).catch(error => {
        console.log(error.response.data.error)
        setMessage(['error', error.response.data.error])
        setTimeout(() => setMessage(['',null]), 6000)
      })
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(personObject)
                   .then(p => {
                     setPersons(persons.concat(p))
                     setMessage(['success', `Added ${p.name}`])
                     setTimeout(() => setMessage(['',null]), 3000)
                   }).catch(error => {
                     console.log(error.response.data.error)
                     setMessage(['error', error.response.data.error])
                     setTimeout(() => setMessage(['',null]), 6000)
                   })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletId = id => event => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService.delet(id)
                   .catch(error => {
                     setMessage(['error', `${name} was already removed from server`])
                     setTimeout(() => setMessage(['',null]), 5000)
                   })
                   .then(_ => {
                     setPersons(persons.filter(p => p.id !== id))})
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const filterBy = p => p.name.toLowerCase().includes(filter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
