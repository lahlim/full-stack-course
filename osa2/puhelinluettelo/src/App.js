import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import './index.css';

// filtering component
const Filter = props => {
  return (
    <div>
      rajaa näytettäviä: <input onChange={props.handleFilter} />
    </div>
  );
};

// main component
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [show, setShow] = useState(persons);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(true);

  // gets data from server
  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
      setShow(initialPersons);
    });
  }, []);

  // sets notification message and error or success with bool
  const changeError = (msg, suc) => {
    setSuccess(suc);
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

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

    const person = persons.find(p => p.name === newName);
    if (person !== undefined && newName === person.name) {
      changeError(`Henkilön ${newName} numero korvattiin uudella.`, true);
      const changed = { ...person, number: newNumber };
      personsService
        .update(person.id, changed)
        .then(returned => {
          setPersons(persons.map(p => (person.name !== p.name ? p : returned)));
          setShow(persons.map(p => (person.name !== p.name ? p : returned)));
        })
        .catch(e => {
          console.log('Virhe poistossa:', e);
          changeError(`Henkilö on poistettu`, false);
        });
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    personsService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setShow(persons.concat(returnedPerson));
      changeError(`Lisättiin ${newName}.`, true);
    });
    setNewName('');
    setNewNumber('');
  };

  // handles remove with id
  const handleRemove = e => {
    const id = e.target.value;

    personsService
      .remove(id)
      .then(resp => {
        setPersons(persons.filter(p => p.id.toString() !== id.toString()));
        setShow(persons.filter(p => p.id.toString() !== id.toString()));
        changeError(`Poistettiin henkilö onnistuneesti.`, true);
      })
      .catch(e => {
        console.log('Virhe poistossa:', e);
        changeError(`Henkilö on jo poistettu`, false);
      });
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter handleFilter={handleFilter} />

      <h2>Lisää uusi</h2>
      <Notification message={errorMessage} success={success} />
      <AddPerson
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />

      <h2>Numerot</h2>
      <Persons persons={show} handleRemove={handleRemove} />
    </div>
  );
};

// Notification component
const Notification = ({ message, success }) => {
  if (message === null || message === '') {
    return null;
  }
  if (success === true) return <p className='success'>{message}</p>;

  return <p className='error'>{message}</p>;
};

// person component
const Person = ({ person, handleRemove }) => (
  <p>
    {person.name} {person.number}
    <button value={person.id} onClick={handleRemove}>
      Poista
    </button>
  </p>
);

// component for persons
const Persons = ({ persons, handleRemove }) => {
  const allPersons = persons.map(person => (
    <Person key={person.name} person={person} handleRemove={handleRemove} />
  ));
  return allPersons;
};

const AddPerson = ({
  newName,
  newNumber,
  addName,
  handleNameChange,
  handleNumberChange
}) => (
  <form onSubmit={addName}>
    <fieldset>
      <div>
        nimi: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        numero: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>lisää</button>
      </div>
      <div />
    </fieldset>
  </form>
);

export default App;
