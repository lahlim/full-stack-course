import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from 'react-apollo-hooks';

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');

  const client = useApolloClient();
  // QUERYS:
  const authorsq = useQuery(ALL_AUTHORS);

  console.log(authorsq);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} data={authorsq} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
