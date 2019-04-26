import React, { useState, useEffect } from 'react';
import axios from 'axios';

// filtering component
const Filter = props => {
  return (
    <div>
      rajaa näytettäviä: <input onChange={props.handleFilter} />
    </div>
  );
};

// person component
const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

// component for persons
const Persons = ({ persons }) => {
  const allPersons = persons.map(person => (
    <Person key={person.name} person={person} />
  ));
  return allPersons;
};

// main component
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [show, setShow] = useState(persons);

  // gets data from server
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
      setShow(response.data);
    });
  }, []);

  // Compares imput of filter and filters matches to show
  const handleFilter = e => {
    const found = persons.filter(
      person =>
        person.name
          .toLocaleLowerCase()
          .indexOf(e.target.value.toLocaleLowerCase()) > -1
    );
    setShow(found);
  };

  // handles change of number input box
  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  // handles change of number input
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  // eventhandling for form submit
  const addName = event => {
    event.preventDefault();
    if (newName === '') return;
    console.log('nappia painettu', event.target);
    for (let person of persons) {
      if (newName === person.name) {
        alert(`${newName} on jo luettelossa!`);
        return;
      }
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setShow(show.concat({ name: newName, number: newNumber }));
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter handleFilter={handleFilter} />

      <h2>Lisää uusi</h2>
      <AddPerson
        addName={addName}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />

      <h2>Numerot</h2>
      <Persons persons={show} />
    </div>
  );
};

const AddPerson = ({ addName, handleNameChange, handleNumberChange }) => (
  <form onSubmit={addName}>
    <fieldset>
      <div>
        nimi: <input onChange={handleNameChange} />
      </div>
      <div>
        numero: <input onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>lisää</button>
      </div>
      <div />
    </fieldset>
  </form>
);

export default App;
