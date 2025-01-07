import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, classes: "notification" })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const displayNotification = (message, classes) => {
    setNotification({ message: message, classes: classes})
    setTimeout(() => {
      setNotification({ ...notification, message: null })
      
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const foundPerson = persons.find(person => person.name === newName)

    if(foundPerson !== undefined) {
      if (window.confirm(`${newName} is already in the phonebook, replace old phone number?`)) {
        updatePerson(foundPerson)
      }
    } else {
      const newPerson = { name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(response => {
          displayNotification(`Created new person "${response.name}"`, "notification")
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updatePerson = person => {
    const updatedPerson = { ...person, number: newNumber}
    personService
    .update(person.id, updatedPerson)
    .then(response => {
      displayNotification(`Updated number of person "${response.name}"`, "notification")
      setPersons(persons.map(p => p.id !== person.id ? p : response))
    })
    .catch(error => {
      displayNotification(`Could not update Person "${person.name}" because they have been deleted`, "notification error")
      setPersons(persons.filter(p => p.id !== person.id))
    })
  }

  const removePerson = id => {
    const removePersonName = persons.find(p => p.id === id).name

    if (window.confirm(`Are you sure you want to delete ${removePersonName}`)) {
      personService
        .remove(id)
        .then((response) => {
          displayNotification(`Deleted person "${response.name}"`, "notification")
        })
        .catch(error => {
          displayNotification(`Could not delete Person "${removePersonName}" because they have already been deleted`, "notification error")
        })
        setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter handleChange={handleFilterChange} value={filter}/>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleClick={addPerson} />
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )

}

export default App