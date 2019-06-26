import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notify, hide } from '../reducers/notificationReducer';

const AnecdoteList = props => {
  const vote = anecdote => {
    props.notify(`You voted: "${anecdote.content}"`);
    props.voteAnecdote(anecdote.id);
    setTimeout(() => {
      props.hide();
    }, 5000);
  };

  return (
    <div className='Listing'>
      <h2>Anecdotes</h2>
      {props.filteredAnecdotes.map(anecdote => (
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

const anecdotesToShow = ({ filter, anecdotes }) => {
  console.log(anecdotes);
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
};

const mapStateToProps = state => {
  return {
    filteredAnecdotes: anecdotesToShow(state)
  };
};

const mapDispatchToProps = {
  notify,
  voteAnecdote,
  hide,
  anecdotesToShow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
