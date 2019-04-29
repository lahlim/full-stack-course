import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState();
  const [show, setShow] = useState();

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = e => {
    const found = countries.filter(
      country =>
        country.name
          .toLocaleLowerCase()
          .indexOf(e.target.value.toLocaleLowerCase()) > -1
    );
    setShow(found);
  };

  return (
    <>
      <h1>Country info</h1>
      Find countries <input onChange={handleFilter} />
      <Countries countriess={countries} />
    </>
  );
};

const Country = ({ country }) => <p>{country.name}</p>;

const Countries = ({ countries }) => {
  console.log(countries);
  // fix this
  return <div />;
};

export default App;
