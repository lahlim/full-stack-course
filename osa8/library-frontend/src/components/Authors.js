import React, { useState } from 'react';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Authors = ({ show, data, setBornTo }) => {
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  if (!show) {
    return null;
  }

  if (data.loading === true) return <p>Loading...</p>;

  let authors = data.data.allAuthors;
  if (!authors) return <h2>No authors found</h2>;

  const submit = async e => {
    e.preventDefault();
    try {
      await setBornTo[0]({
        variables: { name: selectedOption.value, born: parseInt(born) }
      });
    } catch (error) {
      console.log('ERROR IN AGE CHANGE: ', error);
    }
  };

  const options = authors.map(author => ({
    value: author.name,
    label: author.name
  }));

  const handleChange = e => {
    setSelectedOption(e);
  };

  return (
    <div>
      <Row>
        <Col>
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
        </Col>
        <Col>
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
        </Col>
      </Row>
    </div>
  );
};

export default Authors;
