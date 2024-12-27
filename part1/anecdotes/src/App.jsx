import { useState } from 'react'


const Button = ({text, ClickHandler}) => {
  return (
    <button onClick = {ClickHandler} className='NextAnecdote'>
      {text}
    </button>
  )
}

//this is the first section and recieves all the parameters than it need, but i think it might be do better, 
//whith hierarchy in the components, in that way you dont have to pass all the data in the input format 
const Section1 = ({title, anecdotes, votes, selected, nextHandler, votesHandler}) => {
  return (
    <div>
      <h1>{title}</h1>
      {anecdotes[selected]}
      <p> has {votes[selected]} votes</p>
      <div>
      <Button text = "Next Anecdote" ClickHandler={() => nextHandler(anecdotes.length)} />
      <Button text = "Vote" ClickHandler={votesHandler} />
      </div>
    </div>
  )
}


const Section2 = ({title, anecdotes, votes, most_votes_index}) => {
  return (
    <div>
      <h1>{title}</h1>
      {anecdotes[most_votes_index]}
      <p> has {votes[most_votes_index]} votes</p>
    </div>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const NextAnecdoteHandler = (n) => {
    const new_index = Math.floor(Math.random() * n)
    console.log("the new random index is :", new_index)
    setSelected(new_index)
  }
  //VotesHandler :: (void) => (void)
  //creates a new array from votes and then increase the votes of the current state in one
  const VotesHandler = () => {
    let newArray = [...votes]
    newArray[selected] += 1
    console.log("votes is now : ", newArray)
    setVotes(newArray) 
  }
  
  //if the sum of the votes is zero, it means that haven´t been any votes yet
  const AnyVotes = () => votes.reduce((a,b) => a+b, 0) != 0

  return (
    <div>
      <Section1 title = "Anecdote of the day" anecdotes = {anecdotes} votes = {votes} selected = {selected} nextHandler = {NextAnecdoteHandler} votesHandler = {VotesHandler} />
      {AnyVotes() ?
      <Section2 title = "Anecddote with most votes" anecdotes = {anecdotes} votes = {votes} most_votes_index={votes.indexOf(Math.max(...votes))} />
      :
      <h1>There is no votes yet</h1>}
    </div>
  )
}

export default App