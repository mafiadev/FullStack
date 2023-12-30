import { useState } from 'react'

const MostVoted = ({ anecdotes }) => {
  const mostvoted = anecdotes.reduce((previous, current) => {
    return current.votes > previous.votes ? current : previous;
  });

  return (
    <>
      <h1>Anecdote with most voted</h1>
      <p>{mostvoted.anecdote}</p>
      <p>{mostvoted.votes} votes</p>
    </>
  )
}

const Anecdotes = ({ anecdote }) => {
  return (
    <>
      <p>{anecdote.anecdote}</p>
      <p>has {anecdote.votes} votes</p>
    </>
  )
}

function App() {

  const [anecdotes, setAnedotes] = useState([
    {
      anecdote: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },

    {
      anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      anecdote: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },

    {
      anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0
    },
    {
      anecdote: 'The only way to go fast, is to go well.',
      votes: 0
    },
  ])

  const [selected, setSelected] = useState(0)

  const generateRandomAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const voteAnecdote = () => {
    const nextAnedotes = anecdotes.map((k, v) => {
      if (v === selected) {
        return { "anecdote": k.anecdote, "votes": k.votes + 1 }
      } else {
        return { "anecdote": k.anecdote, "votes": k.votes }
      }

    })
    setAnedotes(nextAnedotes)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdotes anecdote={anecdotes[selected]} />
      <button onClick={voteAnecdote}>Vote This</button>
      <button onClick={generateRandomAnecdote}>next anecdote</button>
      <MostVoted anecdotes={anecdotes} />
    </>
  )
}

export default App
