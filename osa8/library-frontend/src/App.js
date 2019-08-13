import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo-hooks';

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

  // QUERYS:
  const authorsq = useQuery(ALL_AUTHORS);
  const booksq = useQuery(ALL_BOOKS);
  const addBook = useMutation(ADD_BOOK);
  const setBornTo = useMutation(SET_BORN_TO);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        data={authorsq}
        setBornTo={setBornTo}
      />

      <Books show={page === 'books'} data={booksq} />

      <NewBook show={page === 'add'} addBook={addBook} />
    </div>
  );
};

export default App;
