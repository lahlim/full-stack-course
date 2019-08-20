import React from 'react';

const Recommendations = ({ show, booksQ, allGenresData, userInfo }) => {
  if (!userInfo || !booksQ) return <div>Loading</div>;
  const books = booksQ.allBooks.filter(
    book => book.genres[0] === userInfo.me.favoriteGenre
  );

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
          {books.map(a => (
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
