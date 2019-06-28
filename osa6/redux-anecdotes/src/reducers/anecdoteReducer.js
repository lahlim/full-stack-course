import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state].concat(action.data);
    case 'VOTE':
      const id = action.data.id;
      const changedAnekdote = action.data;
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnekdote
      );
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.newAnecdote(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newVote = await anecdoteService.vote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    });
    dispatch({
      type: 'VOTE',
      data: newVote
    });
  };
};

export default reducer;
