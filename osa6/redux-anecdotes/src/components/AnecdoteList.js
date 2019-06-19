import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notify, hide } from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState();
  anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = anecdote => {
    store.dispatch(notify(`You voted: "${anecdote.content}"`));
    store.dispatch(voteAnecdote(anecdote.id));
    setTimeout(() => {
      store.dispatch(hide());
    }, 5000);
  };

  const anecdotesToShow = () => {
    return anecdotes.filter(
      item => item.content.toLowerCase().indexOf(filter) !== -1
    );
  };
  console.log(filter);

  return (
    <div className='Listing'>
      <h2>Anecdotes</h2>
      {anecdotesToShow().map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
