const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.message;
    case 'HIDE':
      state = null;
      return state;
    default:
      return state;
  }
};

export const notifyUser = (message, seconds) => {
  return async dispatch => {
    await dispatch({ type: 'SHOW', message });
    setTimeout(() => {
      dispatch({ type: 'HIDE' });
    }, seconds * 1000);
  };
};

export default reducer;
