import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 0 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const addNote = (event) => {
        event.preventDefault()
        const newObj = {
            name: newName,
            number: newNumber,
            id : persons.length
        }
        persons.every((currentValue) => currentValue.name !== newName)
        ? setPersons(persons.concat(newObj))
        : alert( `${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
    }
    let myRe = RegExp(newFilter, 'i')
    if (myRe)
     myRe = persons.filter(value => myRe.test(value.name))
    else
     myRe = persons
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      newFilter = {newFilter} 
      handleFilterChange = {handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm 
      addNote = {addNote} 
      newName = {newName}  
      newNumber = {newNumber}  
      handleNameChange = {handleNameChange} 
      handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons = {myRe}/>

    </div>
  )
}

export default App