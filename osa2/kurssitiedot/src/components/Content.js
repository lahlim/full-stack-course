import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  let rows = () =>
    parts.map(part => {
      return <Part key={part.id} part={part} />;
    });
  return rows();
};

export default Content;
