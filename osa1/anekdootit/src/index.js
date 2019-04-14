import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// nappi
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

// votes komponentti
const Votes = ({ votes, selected }) => (
  <p>has {votes[selected]} votes</p>
)

// Eniten ääniä saanut komponentti, etsitään ja tulostetaan
const MostVotes = ({ anecdotes, votes }) => {
  let max = 0;
  let index = 0;
  for (let i in votes) {
    if (max < votes[i]) {
      max = votes[i];
      index = i;
    }
  }

  if(max === 0) return <h2>Vote for anecdote</h2>;

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
      <p>has {max} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(props.votes);

  const handleClick = () => {
    let rnd = Math.floor(Math.random() * anecdotes.length);
    while (rnd === selected) {
      rnd = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(rnd);
  }

  const handleVote = () => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <Votes votes={votes} selected={selected} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleClick} text="next anecdote" />
      <MostVotes anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const votes = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat);

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes} />,
  document.getElementById('root')
)