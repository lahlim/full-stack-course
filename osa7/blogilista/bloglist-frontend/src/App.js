import React, { useEffect } from 'react';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/AddBlogform';
import loginService from './services/Login';
import Togglable from './components/Togglable';
import Users from './components/Users';
import { notifyUser } from './reducers/notificationReducer';
import { login, logout } from './reducers/loginReducer';
import { initializeBlogs, addBlog } from './reducers/blogsReducer';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = props => {
  console.log(props);

  const logIn = async (e, usr, pw) => {
    e.preventDefault();
    const loguser = {
      password: pw,
      username: usr
    };
    try {
      const user = await loginService.login(loguser);
      props.login(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      console.log(exception);
      props.notifyUser(`käyttäjätunnus tai salasana virheellinen`, 5);
    }
  };

  const logOut = () => {
    props.logout();
    window.localStorage.clear();
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      props.login(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async blog => {
    try {
      await props.addBlog(blog);
      props.notifyUser(`Blogin "${blog.title}" lisäys onnistui`, 5);
    } catch {}
  };

  if (props.user === null)
    return (
      <>
        <h2 style={{ color: 'red' }}>{props.notification}</h2>
        <LoginForm logIn={logIn} />
      </>
    );
  return (
    <div>
      {props.user !== null && <LoggedInfo user={props.user} logOut={logOut} />}
      <br />
      <Router>
        <Link style={{ padding: 5 }} to='/'>
          Blogs
        </Link>
        <Link style={{ padding: 5 }} to='/users'>
          Users
        </Link>
        {props.user !== null && (
          <Togglable buttonLabel='Add Blog'>
            <BlogForm addBlog={addBlog} />
          </Togglable>
        )}
        <Route exact path='/users' render={() => <Users />} />
        <Route exact path='/' render={() => <BlogList props={props} />} />
        <h2 style={{ color: 'green' }}>{props.notification}</h2>
      </Router>
    </div>
  );
};

const LoggedInfo = ({ user, logOut }) => {
  const handleLogOut = () => logOut();
  return (
    <>
      <p>{user.username} is logged in</p>
      <button onClick={handleLogOut}>LogOut</button>
    </>
  );
};

const mapDispatchToProps = {
  notifyUser,
  initializeBlogs,

  addBlog,
  login,
  logout
};

const mapStateToProps = state => {
  console.log(state);
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
