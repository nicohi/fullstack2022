import { useState } from 'react'

const Button = ({onClick, label}) => (
    <button onClick={onClick}> {label} </button>
)

const App = () => {

  const getRandomInt= max => Math.floor(Math.random() * max)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [points, setPoints] = useState({})

  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))

  const [bestId, setBestId] = useState(0)

  const readPoints = (i) => points[i] ? points[i] : 0

  const resetBest = (points) => Object.entries(points).forEach(([id,votes]) => votes > readPoints(bestId) ? setBestId(id) : {})

  const setRandState = (max, setFn) => () => setFn(getRandomInt(max))

  const incrSelected = () => {
    const newPoints = {...points, [selected]: readPoints(selected)+1}
    setPoints(newPoints)
    resetBest(newPoints)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {readPoints(selected)} votes</div>
      <Button label='vote' onClick={incrSelected}/>
      <Button label='next anecdote' onClick={setRandState(anecdotes.length, setSelected)}/>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[bestId]}</div>
    </>
  )
}

export default App
