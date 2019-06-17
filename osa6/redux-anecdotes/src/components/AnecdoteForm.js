import React, { useState } from 'react';
import { createNew } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ store }) => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const handleNewChange = e => setNewAnecdote(e.target.value);

  const createAnecdote = e => {
    e.preventDefault();
    store.dispatch(createNew(newAnecdote));
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
