import { useState } from 'react'

//----------------Globals functions -----------------------------------------------
//average function to calculate the average beetween the good, neutral and bad
  const average = (good_value, neutral_value, bad_value) => {
    const total_Statistics  = good_value + neutral_value + bad_value
    const sum = good_value + 0*neutral_value + (-1 * bad_value)
    return sum/total_Statistics 
  }
//positive_percentaje
const positive_percentage = (good_value, neutral_value, bad_value) => 100*good_value/(neutral_value + bad_value + good_value)

//preposition to know if the feedback have been given or not
const feedbackGiven = (good_value, neutral_value, bad_value) => (good_value != 0 || neutral_value != 0 || bad_value != 0)

//---------------------COMPONENTS----------------------------------

const Button = ({eventHandler, type}) => {
  return (
    <button onClick={eventHandler} className='Button'>
      {type}
    </button>
  )
}

const TableRow  = ({name, value}) => {
  return (
    <tr className='TableRow'>
      <td>{name} </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h1 className='Title_S2'>
        Statistics
      </h1>
      <table className = "table_statistics">
      <tbody> 
        <TableRow  name = "good" value = {good} />
        <TableRow  name = "neutral" value = {neutral} />
        <TableRow  name = "bad" value = {bad} />
        <TableRow  name = "all" value = {good + neutral + bad} />
        <TableRow  name="average" value={average(good, neutral, bad)} />
        <TableRow  name="positive" value={positive_percentage(good, neutral, bad).toString() + "%"} />
      </tbody>
    </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Handlers
  const goodHandler = () => {
    console.log("good increased by one")
    const newGood = good + 1
    setGood(newGood)
  }
  const neutralHandler = () => {
    console.log("neutral increased by one")
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }
  const badHandler = () => {
    console.log("bad increased by one")
    const newBad = bad + 1
    setBad(newBad)
  }

  //JSX return
  return (
    <>
      <div className = "S1">
        <h1>Give Feedback</h1>
        <Button eventHandler={goodHandler} type="good" />
        <Button eventHandler={neutralHandler} type="neutral" />
        <Button eventHandler={badHandler} type="bad" />
      </div>
      {feedbackGiven(good, neutral, bad) ? 
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
      : 
      <p>No feedback given</p>}
    </>
    
  )
}

export default App