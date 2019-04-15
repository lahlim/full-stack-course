import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          nimi: <input />
        </div>
        <div>
          <button type='submit'>lisää</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numerot</h2>
      ...
    </div>
  );
};

export default App;
