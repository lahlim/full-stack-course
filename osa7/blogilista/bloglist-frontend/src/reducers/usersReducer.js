import usersService from '../services/users';

const initialState = [];

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({
      type: 'INIT',
      data: users
    });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
