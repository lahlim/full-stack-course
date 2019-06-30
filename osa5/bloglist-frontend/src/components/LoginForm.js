import React from 'react';
import { useField } from '../hooks';

const LoginForm = ({ logIn }) => {
  const handleLogin = e => logIn(e, username.value, password.value);

  const [username] = useField('text');
  const [password] = useField('password');

  return (
    <>
      <h2>Log in please</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username
          <input {...username} />
        </label>
        <label>
          Password
          <input {...password} />
        </label>
        <button>LogIn</button>
      </form>
    </>
  );
};

export default LoginForm;
