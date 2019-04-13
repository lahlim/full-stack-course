
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// yksittäinen tilasto komponentti
const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

// nappi
const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

// Otsikko komponentti
const Otsikko = ({ nimi }) => <h1>{nimi}</h1>

// Statistiikka komponentti tulostukseen
const Statistics = ({ good, bad, neutral }) => {
  if (good + bad + neutral === 0) {
    return (
      <div>
        <Otsikko nimi='Statistiikka' />
        Ei yhtään palautetta annettu.
      </div>
    )
  }
  return (
    <>
      <Otsikko nimi='Statistiikka' />
      <table>
        <tbody>
          <Statistic text="hyvä" value={good} />
          <Statistic text="neutraali" value={neutral} />
          <Statistic text="huono" value={bad} />
          <tr><td>Keskiarvo</td><td> {claculateAvrg(good, neutral, bad)}</td></tr>
          <tr><td>Positiivisia</td><td> {claculatePositive(good, neutral, bad)} %</td></tr>
        </tbody>
      </table>
    </>
  )

}

// lasketaan keskiarvo
const claculateAvrg = (a, b, c) => {
  let sum = a + b + c;
  c = c * -1;
  b = 0;
  return (a + b + c) / sum;
}

// lasketaan positiivisten suhde prosentteina
const claculatePositive = (a, b, c) => {
  return a / (a + b + c) * 100;
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <div>
        <Otsikko nimi='Anna palautetta' />
        <Button handleClick={handleGoodClick} text='hyvä' />
        <Button handleClick={handleNeutralClick} text='neutraali' />
        <Button handleClick={handleBadClick} text='huono' />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

let counter = 1

ReactDOM.render(
  <App counter={counter} />,
  document.getElementById('root')
)


