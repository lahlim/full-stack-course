const initialState = null;

export const login = user => {
  return {
    type: 'LOGIN',
    user
  };
};

export const logout = () => {
  console.log('LOGOUT REDUCER:');
  return {
    type: 'LOGOUT'
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export default reducer;
