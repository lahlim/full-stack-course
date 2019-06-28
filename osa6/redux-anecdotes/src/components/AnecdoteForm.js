import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import { notifyUser } from '../reducers/notificationReducer';

const AnecdoteForm = props => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const handleNewChange = e => setNewAnecdote(e.target.value);

  const createAnecdote = async e => {
    e.preventDefault();

    props.createNew(newAnecdote);
    props.notifyUser(`Added: ${newAnecdote}`, 5);
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

const mapDispatchToProps = {
  createNew,
  notifyUser
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
