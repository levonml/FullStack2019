import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [newFilter, setNewFilter] = useState('')
    useEffect(() =>{
        axios
            .get('http://localhost:3004/persons')
            .then(response => {
            const person_init = response.data
            setPersons(person_init)
            })
        }, [])
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
    let filtered
    let myRe = RegExp(newFilter, 'i')
    console.log("myRe = ",newFilter);
    if (newFilter)
        filtered  = persons.filter(value => myRe.test(value.name))
    else
        filtered = persons
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
      <Persons persons = {filtered}/>

    </div>
  )
}

export default App