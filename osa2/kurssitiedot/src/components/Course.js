import React from 'react';

const Course = ({ course }) => {
  return (
    <>
      <h1>Opetusohjelma</h1>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  const sum = parts
    .map(part => part.exercises)
    .reduce((total, exercises) => total + exercises);
  let combination = {
    name: 'Yhteensä',
    exercises: sum
  };

  let rows = () =>
    parts.map(part => {
      return <Part key={part.id} part={part} />;
    });

  return (
    <>
      {rows()}
      <Part part={combination} />
    </>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part.name} {part.exercises} tehtävää
    </p>
  );
};

export default Course;
