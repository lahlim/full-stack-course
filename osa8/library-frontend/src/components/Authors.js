import React, { useState } from 'react';
import Select from 'react-select';

const Authors = ({ show, data, setBornTo }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  if (!show) {
    return null;
  }
  let authors = [];

  if (data.loading === true) return <p>Loading...</p>;

  authors = data.data.allAuthors;

  const submit = async e => {
    e.preventDefault();
    console.log(selectedOption.value);
    setName(selectedOption.value);

    let updated = await setBornTo[0]({
      variables: { name, born: parseInt(born) }
    });

    authors.concat(updated);
  };
  console.log(authors);

  const options = authors.map(author => ({
    value: author.name,
    label: author.name
  }));
  console.log(options);

  const handleChange = e => {
    setSelectedOption(e);
  };

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
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
