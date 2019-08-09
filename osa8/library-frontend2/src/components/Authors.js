import React, { useState } from 'react';

const Authors = ({ show, data }) => {
  if (!show) {
    return null;
  }
  let authors = [];

  if (data.loading === true) return <p>Loading...</p>;

  authors = data.data.allAuthors;
  console.log(data.data.allAuthors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
