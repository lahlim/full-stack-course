import React, { useState } from 'react';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  if (props.show) return null;

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const result = await props.login[0]({
        variables: {
          username,
          password
        }
      });

      if (result) {
        const token = result.data.login.value;
        props.setToken(token);
        localStorage.setItem('token', token);
      }

      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('Error in login: ', error);
    }
  };

  return (
    <div>
      Username
      <input
        type='text'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      Password
      <input
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
