import React, { useState } from 'react';
import { createNew } from '../reducers/anecdoteReducer';
import { notify, hide } from '../reducers/notificationReducer';

const AnecdoteForm = ({ store }) => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const handleNewChange = e => setNewAnecdote(e.target.value);

  const createAnecdote = e => {
    e.preventDefault();
    store.dispatch(createNew(newAnecdote));
    store.dispatch(notify(`Added: ${newAnecdote}`));
    setTimeout(() => {
      store.dispatch(hide());
    }, 5000);
  };

  return (
    <div className='newForm'>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input onChange={handleNewChange} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
