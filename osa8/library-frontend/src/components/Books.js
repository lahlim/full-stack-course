import React, { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';

const Books = ({ show, booksQ, allGenresData }) => {
  const [books, setBooks] = useState([]);
  const [bookstoShow, setBookstoShow] = useState([]);
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: booksQ
      })
      .then(res => setBooks(res.data.allBooks));
    client
      .query({
        query: booksQ
      })
      .then(res => setBookstoShow(res.data.allBooks));
  }, [booksQ, client]);

  const filterByGenre = e => {
    setBookstoShow(books.filter(book => book.genres[0] === e.target.value));
  };

  if (!show) {
    return null;
  }
  if (!books) return <h2>NoBooks</h2>;
  if (!allGenresData) return <h2>NoGenres</h2>;

  let genres = new Set(
    allGenresData.data.allBooks.reduce(
      (prev, cur) => prev.concat(cur.genres),
      []
    )
  );
  genres = [...genres];
  const allBooks = () => {
    setBookstoShow(books);
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {bookstoShow.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} value={genre} onClick={filterByGenre}>
          {genre}
        </button>
      ))}
      <button key={'all'} value={''} onClick={allBooks}>
        allGenres
      </button>
    </div>
  );
};

export default Books;
