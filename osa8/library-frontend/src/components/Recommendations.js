import React, { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';

const Recommendations = ({ show, booksQ, allGenresData }) => {
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
    console.log(e.target.value);

    setBookstoShow(books.filter(book => book.genres[0] === e.target.value));
  };

  if (!show) {
    return null;
  }
  if (!books) return <h2>NoBooks</h2>;
  if (!allGenresData) return <h2>NoGenres</h2>;

  return (
    <div>
      <h2>Recommended</h2>

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
    </div>
  );
};

export default Recommendations;
