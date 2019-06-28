import React, { useEffect } from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { connect } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = props => {
  useEffect(() => {
    props.initializeAnecdotes();
  }, []);

  return (
    <div>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default connect(
  null,
  { initializeAnecdotes }
)(App);
