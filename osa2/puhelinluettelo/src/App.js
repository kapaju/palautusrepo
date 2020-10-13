/**
 * Fullstack Mooc 2020
 * Osa 2 - Puhelinluettelo
 * Katja Wallenius
 */

import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterRule, setFilterRule] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilterRule(event.target.value)
  }


  /* Adds a new person to the json-server */
  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name === newName)

    /* If name already exists, check if user wants to change the number */
    if (found) {
      if(window.confirm(`${newName} already exists. Do you want to replace number?`)) {
        updateNumber(found)
      }
    }
    /* If name is new, create new person object*/
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewMessage(
            `${returnedPerson.name} was added to phonebook!`
          )
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
        
    }
    setNewName('')
    setNewNumber('')
  }

  /* Delete an existing person from json-server */
  const deletePerson = (name) => {
    const match = persons.find(person => person.name === name)
    if (window.confirm(`Delete ${match.name}?`)) {
      console.log("Deleting person")
      personService
        .remove(match.id).then(returnedPerson => {
          setPersons(persons.filter(person => person.name !== match.name))
          setNewMessage(
            `${match.name} was deleted from phonebook!`
          )
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
        .catch(error => {
          setIsError(true)
          setNewMessage(
            `${name} was already removed from server`
          )
          setTimeout(() => {
            setNewMessage(null)
            setIsError(false)
          }, 5000)
        })
    }
  }

  /* Update number of person that already exists in the json-server */
  const updateNumber = (personObject) => {
    const updatedPerson = { ...personObject, number: newNumber}
    const id = personObject.id
    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewMessage(
          `Updated number of ${returnedPerson.name}!`
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
      .catch(error => {
          setIsError(true)
          setNewMessage(
            `${newName} was already removed from server`
          )
          setTimeout(() => {
            setNewMessage(null)
            setIsError(false)
          }, 5000)
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} isError={isError}/>
      <Filter 
        filterRule={filterRule} 
        handleFilter={handleFilter}
      />
      <h2>Add new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filterRule={filterRule} 
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App