import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Blog from './Blog';

afterEach(cleanup);

const testBlog = {
  title: 'Tittle of Blog',
  author: 'Author',
  likes: 2,
  user: {
    username: 'testeri'
  },
  url: 'www.urltest.fi'
};

test('test minimized', () => {
  const component = render(
    <Blog blog={testBlog} user={{ username: 'testeri' }} />
  );

  expect(component.container).toHaveTextContent('Tittle of Blog Author');
  expect(component.container).not.toHaveTextContent('like');
  expect(component.container).not.toHaveTextContent('www.urltest.fi');
});

test('test fully open', () => {
  const component = render(
    <Blog blog={testBlog} user={{ username: 'testeri' }} />
  );
  const title = component.getByText('Tittle of Blog Author');

  fireEvent.click(title);
  expect(component.container).toHaveTextContent(
    'Tittle of BlogAuthor www.urltest.fi Likes: 2 Like Added by: Remove'
  );
});
