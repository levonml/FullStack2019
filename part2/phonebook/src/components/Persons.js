import React from 'react'
const Person = ({person, deleteContact}) => {
    return(<div>
    <form onSubmit = {deleteContact} id = {person.id}>
        <li > {person.name} {person.number} <button type = "submit" >delete</button></li>
    </form>
    </div>)

}
const Persons = ({persons, deleteContact}) => {
    return(<div>
        <ul>
            {persons.map(p => <Person key = {p.id} person = {p}  deleteContact = {deleteContact}/>)}
        </ul>
        </div>)
}

export default Persons