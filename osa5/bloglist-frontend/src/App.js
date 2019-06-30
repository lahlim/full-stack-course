import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/AddBlogform';
import loginService from './services/Login';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [succesMessage, setSuccesMessage] = useState('');

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

  const removeBlog = blog => {
    console.log('poisto');
    console.log(blog);
    blogService.remove(blog.id);
  };

  const addLike = blog => {
    const id = blog.id;
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    };
    console.log(id);
    console.log(blogObject);
    blogService.update(id, blogObject);
  };

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async blog => {
    try {
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      setSuccesMessage(`Blogin "${returnedBlog.title}" lisäys onnistui`);
      setTimeout(() => {
        setSuccesMessage(null);
      }, 5000);
    } catch {}
  };

  if (user === null)
    return (
      <>
        <h2 style={{ color: 'red' }}>{errorMessage}</h2>
        <LoginForm logIn={logIn} />
      </>
    );
  return (
    <div>
      {user !== null && <LoggedInfo user={user} logOut={logOut} />}
      <h2 style={{ color: 'green' }}>{succesMessage}</h2>
      {user !== null && (
        <Togglable buttonLabel='Add Blog'>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}

      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog
          removeBlog={removeBlog}
          addLike={addLike}
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  );
};

const LoggedInfo = ({ user, logOut }) => {
  const handleLogOut = () => logOut();
  return (
    <>
      <p>{user.username} is logged in</p>{' '}
      <button onClick={handleLogOut}>LogOut</button>
    </>
  );
};

export default App;
