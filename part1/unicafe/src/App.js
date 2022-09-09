import { useState } from 'react'

const Button = ({onClick, label}) => (
    <button onClick={onClick}> {label} </button>
)

const StatisticLine = ({text, value}) => (
    <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad

  if (total === 0) return (<><h1>statistics</h1><div>No feedback given</div></>)
  return (
  <>
    <h1>statistics</h1>
    <table>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all" value={total}/>
    <StatisticLine text="average" value={(good-bad)/total}/>
    <StatisticLine text="positive" value={good/(total)+'%'}/>
    </table>
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const iterState = (val, setFn) => () => setFn(val+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" onClick={iterState(good,setGood)}/>
      <Button label="neutral" onClick={iterState(neutral,setNeutral)}/>
      <Button label="bad" onClick={iterState(bad,setBad)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
