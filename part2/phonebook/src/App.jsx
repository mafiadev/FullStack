import React, { useState, useEffect } from 'react'
import axios from "axios"

import PersonsService from './services/Persons'
import Filter from './Filter'

const Persons = ({ persons, handleClick }) => {
  return (persons.map(person => <p key={person.id}>{person.name} | {person.number} <button onClick={() => handleClick(person.id)} >DELETE</button></p>))
}

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.submit} >
        <div>
          name: <input onChange={props.handleName} value={props.newName} />
          <br />
          number: <input onChange={props.handleNumber} value={props.newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const hook = () => {
    PersonsService
      .getAll()
      .then(persons => setPersons(persons))
  }
  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    const foundName = persons.find(({ name }) => name === newName)

    if (newName === "" || newNumber === "") {
      console.log('rellenar todos los campos')
      return;
    }

    if (foundName) {
      console.log('actualizar numero')
      if (confirm("Replace te Old number with a new one?")) {
        //actualizar
        const person = persons.find(p => p.id === foundName.id)
        const changedNote = { ...person, number: newNumber }

        PersonsService.update(foundName.id, changedNote)
          .then(returnPerson => {
            const newPersons = persons.filter(p => p.id !== foundName.id)
            //console.log(MyPersons.concat(returnPerson))
            setPersons(newPersons.concat(returnPerson))
            setNewName('')
            setNewNumber('')
          })
        console.log(changedNote)
      } else {
        //cancela
      }
      return;
    }

    const newPersonObject = {
      name: newName.toString(),
      number: newNumber.toString()
    }

    PersonsService
      .create(newPersonObject)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
      })

    console.log('new number add')

  }
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setPersons([])

    const newPerson = {
      name: "Marcos",
      number: "640 44 04 48"
    }

    setPersons(persons.concat(newPerson))
  }

  const personDelete = personId => {
    PersonsService
      .deletePerson(personId)
    const deleted = persons.filter(({ id }) => id !== personId);
    setPersons(deleted)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>add a new person</h3>
      <PersonForm
        submit={addPerson}
        newName={newName}
        handleName={handleNewName}
        handleNumber={handleNewNumber}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} handleClick={personDelete} />
    </div>
  )
}

export default App