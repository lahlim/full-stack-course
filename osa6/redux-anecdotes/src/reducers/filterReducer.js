const initialState = '';

export const filter = data => {
  return {
    type: 'FILTER',
    text: data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.text;
    default:
      return initialState;
  }
};

export default reducer;
