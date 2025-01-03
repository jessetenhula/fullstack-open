import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const MostVotedAnecdote = ( {votes, anecdotes} ) => {
  let total = 0
  let mostVotedIndex = 0

  for(let i = 0; i < anecdotes.length; i++) {
    total += votes[i]
    if(votes[i] > votes[mostVotedIndex]) {
      mostVotedIndex = i
    }

  }

  if(total !== 0) {
    return (
      <>
        {anecdotes[mostVotedIndex]}
        <br />
        Has {votes[mostVotedIndex]} votes
      </>
    )
  }

  return(
    <>
      No votes yet
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 })
  
  const showRandomAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const addVoteToAnecdote = (index) => {
    const copy = { ...votes }
    copy[index]++
    setVotes(copy)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <br />
        Has {votes[selected]} votes
      </div>
      <Button handleClick={() => addVoteToAnecdote(selected)} text="vote"></Button>
      <Button handleClick={() => showRandomAnecdote()} text="next anecdote"></Button>
      <h1>Anecdote with the most votes</h1>
      <MostVotedAnecdote votes={votes} anecdotes={anecdotes}/>
    </>
  )
}

export default App