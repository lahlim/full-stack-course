import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';
jest.mock('./services/blogs');

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('LogIn'));
  });

  it('if logged in, display blogs', async () => {
    const user = {
      username: 'PPAA',
      name: 'Teppo testaaja',
      token: 'adssadsadsadsad'
    };
    localStorage.setItem('loggedUser', JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('Test blog 1 Test user 1'));
  });
});
