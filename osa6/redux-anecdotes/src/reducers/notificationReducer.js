const initialState = '';

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);
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

export const notify = message => {
  return {
    type: 'SHOW',
    message
  };
};

export const hide = () => {
  return {
    type: 'HIDE'
  };
};

export default reducer;
