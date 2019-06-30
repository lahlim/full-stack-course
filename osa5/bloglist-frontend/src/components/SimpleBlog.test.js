import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const testingBlog = {
  author: 'Author',
  title: 'Title of blog',
  likes: 2
};

test('render blog content', () => {
  const component = render(<SimpleBlog blog={testingBlog} />);
  const element = component.getByText('Title of blog');
  expect(element).toBeDefined();
});

test('click adds one to likes', () => {
  let count = 0;
  const handler = () => {
    count += 1;
  };

  const component = render(<SimpleBlog blog={testingBlog} onClick={handler} />);

  const button = component.container.querySelector('button');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(count).toEqual(2);
});
