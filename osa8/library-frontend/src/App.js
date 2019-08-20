import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Recommendations from './components/Recommendations';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Container from 'react-bootstrap/Container';

const GET_USER = gql`
  query me {
    me {
      username
      favoriteGenre
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
      genres
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

const ALL_GENRES = gql`
  {
    allBooks {
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
  const allBooks = useQuery(ALL_BOOKS);
  const addBook = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_GENRES }, ALL_AUTHORS]
  });
  const setBornTo = useMutation(SET_BORN_TO);
  const login = useMutation(LOGIN);
  const allGenresQ = useQuery(ALL_GENRES);
  const userInfo = useQuery(GET_USER);

  if (!localStorage.getItem('token'))
    return <LoginForm login={login} setToken={token => setToken(token)} />;

  return (
    <>
      <Container>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>
            Recommendation
          </button>
          <button onClick={() => logOut()}>LogOut</button>
        </div>

        <Authors
          show={page === 'authors'}
          data={authorsq}
          setBornTo={setBornTo}
        />

        <Books
          show={page === 'books'}
          booksQ={ALL_BOOKS}
          allGenresData={allGenresQ}
          allGenres={ALL_GENRES}
        />

        <Recommendations
          show={page === 'recommendations'}
          booksQ={allBooks.data}
          allGenresData={allGenresQ}
          allGenres={ALL_GENRES}
          userInfo={userInfo.data}
        />

        <NewBook show={page === 'add'} addBook={addBook} />
      </Container>
    </>
  );
};

export default App;
