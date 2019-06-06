import React, { useState } from 'react';

const LoginForm = ({ logIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUserChange = e => setUsername(e.target.value);
  const handlePWChange = e => setPassword(e.target.value);
  const handleLogin = e => logIn(e, username, password);

  return (
    <>
      <h2>Log in please</h2>
      <form onSubmit={handleLogin}>
        <label>
          Tekstiä
          <input onChange={handleUserChange} type='text' />
        </label>
        <label>
          Tekstiä2
          <input onChange={handlePWChange} type='password' />
        </label>
        <button>LogIn</button>
      </form>
    </>
  );
};

export default LoginForm;
