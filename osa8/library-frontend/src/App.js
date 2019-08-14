import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo-hooks';

const GET_ME = gql`
  query me {
    me {
      username
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const SET_BORN_TO = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token', token));
  }, [token]);

  const logOut = () => {
    setToken(null);
    localStorage.clear();
  };

  // QUERYS:
  const authorsq = useQuery(ALL_AUTHORS);
  const booksq = useQuery(ALL_BOOKS);
  const addBook = useMutation(ADD_BOOK);
  const setBornTo = useMutation(SET_BORN_TO);
  const login = useMutation(LOGIN);

  if (!localStorage.getItem('token'))
    return (
      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={token => setToken(token)}
      />
    );

  return (
    <>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logOut()}>LogOut</button>
      </div>

      <Authors
        show={page === 'authors'}
        data={authorsq}
        setBornTo={setBornTo}
      />

      <Books show={page === 'books'} data={booksq} />

      <NewBook show={page === 'add'} addBook={addBook} />
    </>
  );
};

export default App;
