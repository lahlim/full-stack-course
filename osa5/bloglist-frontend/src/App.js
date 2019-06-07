import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/AddBlogform';
import loginService from './services/Login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const logIn = async (e, usr, pw) => {
    e.preventDefault();
    const loguser = {
      password: pw,
      username: usr
    };
    try {
      const user = await loginService.login(loguser);
      setUser(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(window.localStorage);
    } catch (exception) {
      console.log(exception);
      setErrorMessage('käyttäjätunnus tai salasana virheellinen');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    setUser(null);
    console.log('User logged out');
  };

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = () => {
    console.log('hello');
  };

  if (user === null) return <LoginForm logIn={logIn} />;
  return (
    <div>
      {errorMessage}
      {user === null && <LoginForm logIn={logIn} />}
      {user !== null && <LoggedInfo user={user} logOut={logOut} />}
      {user !== null && <BlogForm addBlog={addBlog} />}

      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const LoggedInfo = ({ user, logOut }) => {
  const handleLogOut = () => logOut();
  return (
    <>
      <p>{user.username}</p> <button onClick={handleLogOut}>LogOut</button>
    </>
  );
};

export default App;
