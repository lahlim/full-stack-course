import React, { useState, useEffect } from 'react';
import axios from 'axios';

// weather component
const Weather = props => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios
      .get(
        `http://api.apixu.com/v1/current.json?key=9eab1e54b06c43b5bc285507190205&q=${
          props.query
        }`
      )
      .then(response => {
        console.log(response.data);

        setWeather(response.data);
      })
      .then(weatherNow());
  }, []);

  const weatherNow = () => {
    if (weather === undefined) return <div />;
    return (
      <div>
        <h2>Weather in {props.query}</h2>
        <p>
          <b>Temperature: </b>
          {weather.current.temp_c} celcius
        </p>
        <img src={weather.current.condition.icon} alt='weather' />
        <p>
          <b>Wind: </b>
          {weather.current.wind_kph} kph direction {weather.current.wind_dir}
        </p>
      </div>
    );
  };
  return <>{weatherNow()}</>;
};

const App = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setData(response.data);
    });
  }, []);

  const rows = () => {
    if (show.length > 10) return <p>Specify filter</p>;
    if (show.length === 1) {
      return (
        <>
          <h1>{show[0].name}</h1>
          <p>capital {show[0].capital}</p>
          <p>population {show[0].population}</p>
          <h2>Languages</h2>
          <ul>
            {show[0].languages.map((lang, index) => (
              <li key={index}>{lang.name}</li>
            ))}
          </ul>
          <Weather query={show[0].capital} />

          <img key={show[0].flag} src={show[0].flag} alt='flag' />
        </>
      );
    }

    return show.map(country => (
      <div key={country.numericCode}>
        <p>{country.name}</p>
        <button value={country.name} onClick={handleClick}>
          show
        </button>
      </div>
    ));
  };

  // handles show click
  const handleClick = e => {
    console.log(e.target.value);
    handleFilter(e);
  };

  const handleFilter = e => {
    const found = data.filter(country =>
      country.name
        .toLocaleLowerCase()
        .startsWith(e.target.value.toLocaleLowerCase())
    );
    setShow(found);
  };
  return (
    <>
      <h1>Country info</h1>
      Find countries <input onChange={handleFilter} />
      {rows()}
    </>
  );
};

export default App;
