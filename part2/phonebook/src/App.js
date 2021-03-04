import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import dataServices from './services/data'
import Notification from './components/Notifications'
import Error from './components/Errors'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    console.log("persons =",persons);
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [newNotification, setNotification] = useState(null)
    const [newError, setError] = useState(null)
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
        
        const numberChange = (persons.every((currentValue) => (currentValue.number !== newNumber)))
        const nameChange = persons.every((currentValue) => currentValue.name !== newName)
        console.log("numberchange -", numberChange)
        if (nameChange){
            dataServices
            .create(newObj) 
            .then(returned_note => {
                setPersons(persons.concat(returned_note))
                setNotification(`Added ${newName}`)
                setTimeout(() => setNotification(null), 3000)
            })
        }
        else if (numberChange && !nameChange){
            if(window.confirm( ` ${newName} is already added to phonebook, replace the old number with the new one?`))
            {
                const existingName = persons.find(p => p.name === newName)
                const updated = {...existingName, number: newObj.number}
                dataServices
                .update(existingName.id, updated )
                .then(updated_note => {
                    (setPersons(persons.map(m => m.id === existingName.id ? updated_note : m)))
                    setNotification(` ${newName}'s number has changed`)
                    setTimeout(() => setNotification(null), 3000)
                })  
                .catch(error => {
                    setError(`${newName} has been deleted from the server`)
                    setTimeout(() => setError(null), 3000) 
                    setPersons(persons.filter(p => p.id !== existingName.id))  
                })
            }
        }
        else{
        setNotification(` ${newName} is already added to phonebook` )
        setTimeout(() => setNotification(null), 3000)
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
        if (window.confirm(`delete ${pName}?`)){
            dataServices
            .remove(i)
            .catch(error => {
                setError(`${pName} has been deleted from the server`)
                setTimeout(() => setError(null), 3000)
            })
            const modified = persons.filter(per => per.id !== i)
            setPersons(modified)
            setNotification(`${pName} is deleted succesfully`)
                    setTimeout(() => setNotification(null), 3000) 
        }      
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <Error message = {newError}/>
      <Notification message = {newNotification}/>
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