import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import { notify, hide } from '../reducers/notificationReducer';

const AnecdoteForm = props => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const handleNewChange = e => setNewAnecdote(e.target.value);

  const createAnecdote = e => {
    console.log(createNew);

    e.preventDefault();
    props.createNew(newAnecdote);
    props.notify(`Added: ${newAnecdote}`);
    setTimeout(() => {
      props.hide();
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

const mapDispatchToProps = {
  createNew,
  notify,
  hide
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
