import React from 'react';
import { filter } from '../reducers/filterReducer';

const Filter = props => {
  const handleChange = event => {
    props.store.dispatch(filter(event.target.value));
  };

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};
export default Filter;
