import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './reducers/loginReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  user: loginReducer,
  blogs: blogsReducer,
  notification: notificationReducer,
  users: usersReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
