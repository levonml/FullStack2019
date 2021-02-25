import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import dataServices from './services/data'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    console.log("persons =",persons);
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [newFilter, setNewFilter] = useState('')
    useEffect(() =>{
        console.log('dataServices =', dataServices.getAll());
        dataServices
            .getAll()
            .then(initial_data => {
            setPersons(initial_data)
            })
        }, [])
    const addNote = (event) => {
        event.preventDefault()
        const newObj = {
            name: newName,
            number: newNumber,
        }
        var confirm
        console.log("id = ",persons.id);
        persons.every((currentValue) => currentValue.name !== newName)
        ? 
            dataServices
            .create(newObj) 
            .then(returned_note => {
                console.log("returned_id = ", returned_note.id);
                setPersons(persons.concat(returned_note))
            })
        :    confirm = window.confirm( `${newName} is already added to phonebook, replace the old number with the new one?`)
                if(confirm)
                {
                    const existingName = persons.find(p => p.name === newName)
                    console.log("existingName.id", existingName.id );
                    const updated = {...existingName, number: newObj.number}
                    dataServices
                    .update(existingName.id, updated )
                    .then(updated_note => (setPersons(persons.map(m => m.id === existingName.id ? updated_note : m))))
                }
        setNewName('')
        setNewNumber('')
    }
    let filtered
    let myRe = RegExp(newFilter, 'i')
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
    const deleteContact = (event) => {
        event.preventDefault()
        const i = Number(event.target.id)
        const pName = persons.find(p => p.id === i).name
        console.log("i = ",i);
        console.log("element = ",event.target.id);
        if (window.confirm(`delete ${pName}?`)){
            dataServices
            .remove(i)
            const modified = persons.filter(per => {
                console.log("index_2 =",typeof(i));
                console.log("per.id =", typeof(per.id));
                return per.id !== i})
                setPersons(modified)
        }      
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
      <Persons
       persons = {filtered}
       deleteContact = {deleteContact}
       />

    </div>
  )
}

export default App