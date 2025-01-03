import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ count, text, unit }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{count} {unit}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad}) => {
  let total = good + bad + neutral
  let average = (good - bad) / total
  let positivePercentage = 100 * good / total

  if (total !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine count={good} text="good" />
          <StatisticLine count={neutral} text="neutral" />
          <StatisticLine count={bad} text="bad" />
          <StatisticLine count={total} text="all" />
          <StatisticLine count={average} text="average" />
          <StatisticLine count={positivePercentage} text="positive" unit="%"/>
        </tbody>
      </table>
    )
  }

  return (
    <p>No feedback given.</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App