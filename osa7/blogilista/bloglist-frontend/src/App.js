import React, { useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/AddBlogform';
import loginService from './services/Login';
import Togglable from './components/Togglable';
import { notifyUser } from './reducers/notificationReducer';
import { login, logout } from './reducers/loginReducer';
import {
  initializeBlogs,
  addLike,
  removeBlog,
  addBlog
} from './reducers/blogsReducer';
import { connect } from 'react-redux';

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
    console.log('User logged out');
  };

  const removeBlog = blog => {
    console.log('poisto');
    props.removeBlog(blog.id);
  };

  const addLike = blog => props.addLike(blog);

  useEffect(() => {
    props.initializeBlogs();
  }, []);

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
      <h2 style={{ color: 'green' }}>{props.notification}</h2>
      {props.user !== null && (
        <Togglable buttonLabel='Add Blog'>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}

      <h2>blogs</h2>
      {props.blogs.map(blog => (
        <Blog
          removeBlog={removeBlog}
          addLike={addLike}
          key={blog.id}
          blog={blog}
          user={props.user}
        />
      ))}
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
  addLike,
  removeBlog,
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
