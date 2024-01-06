import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Note from './Components/Note'
import Notification from './Components/Notification'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("a new Note")
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const hook = () => {
        console.log('effect')
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }

    useEffect(hook, [])
    //console.log('render', notes.length, 'notes')
    const addNote = (e) => {
        e.preventDefault()
        if (newNote != "") {

            const noteObject = {
                content: newNote,
                date: new Date().toISOString(),
                important: Math.random() < 0.5
            }
            noteService
                .create(noteObject)
                .then(returnNote => {
                    setNotes(notes.concat(returnNote))
                    setNewNote('')
                })

        } else {
            //console.log('rellenar los campos')
            alert("Rellenar todos los campos")
        }

    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setNewNote(e.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnNote))
            })
            .catch(error => {

                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    return (
        <>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <button onClick={() => setShowAll(!showAll)}>
                Show {showAll ? 'Important' : 'All'}
            </button>
            <ul>
                {
                    notesToShow.map(note => (
                        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                    ))
                }
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>

            <Footer />
        </>
    )
}

export default App