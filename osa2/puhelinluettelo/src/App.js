import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Martti Tienari", number: "040-123456" },
    { name: "Arto Järvinen", number: "040-123456" },
    { name: "Lea Kutvonen", number: "040-123456" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleFilter = e => {
    console.log(e.target.value);
    setNewFilter(e.target.value);
  };

  // handles change of number input box
  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  // handles change of number input
  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  // eventhandling for form submit
  const addName = event => {
    event.preventDefault();
    console.log("nappia painettu", event.target);
    for (let person of persons) {
      if (newName === person.name) {
        alert(`${newName} on jo luettelossa!`);
        return;
      }
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
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
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
        rajaa näytettäviä: <input onChange={handleFilter} />
      </div>
      <h3>Lisää uusi</h3>
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
      <h2>Numerot</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
