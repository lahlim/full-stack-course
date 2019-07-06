import React, { useEffect } from 'react';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/AddBlogform';
import loginService from './services/Login';
import Togglable from './components/Togglable';
import Users from './components/Users';
import User from './components/User';
import NavBarTop from './components/NavBarTop';
import SingleBlog from './components/SingleBlog';
import { notifyUser } from './reducers/notificationReducer';
import { login, logout } from './reducers/loginReducer';
import { addBlog, initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const App = props => {
  console.log(props);
  useEffect(() => {
    props.initializeUsers();
    props.initializeBlogs();
  }, []);

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
      <Router>
        <NavBarTop props={props} />
        <Container>
          <h2 style={{ color: 'green' }}>{props.notification}</h2>
          {props.user !== null && (
            <Togglable buttonLabel='Add Blog'>
              <BlogForm addBlog={addBlog} />
            </Togglable>
          )}

          <Route exact path='/users' render={() => <Users />} />
          <Route exact path='/' render={() => <BlogList />} />
          <Route
            exact
            path='/users/:id'
            render={({ match }) => <User id={match.params.id} />}
          />
          <Route
            exact
            path='/blogs/:id'
            render={({ match }) => <SingleBlog id={match.params.id} />}
          />
        </Container>
      </Router>
    </div>
  );
};

const mapDispatchToProps = {
  notifyUser,
  initializeBlogs,
  initializeUsers,

  addBlog,
  login,
  logout
};

const mapStateToProps = state => {
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
