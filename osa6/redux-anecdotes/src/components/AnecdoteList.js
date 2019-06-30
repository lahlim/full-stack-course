import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notifyUser } from '../reducers/notificationReducer';

const AnecdoteList = props => {
  const vote = anecdote => {
    props.notifyUser(`You voted: "${anecdote.content}"`, 5);
    props.voteAnecdote(anecdote);
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
  console.log('ANEKDOOTIT: ', anecdotes);
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
  notifyUser,
  voteAnecdote,
  anecdotesToShow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
