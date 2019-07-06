import React from 'react';
import { useField } from '../hooks';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const LoginForm = ({ logIn }) => {
  const handleLogin = e => logIn(e, username.value, password.value);

  const [username] = useField('text');
  const [password] = useField('password');

  return (
    <Container>
      <h2>Log in please</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId='formusername'>
          <Form.Label>Username</Form.Label>
          <Form.Control {...username} type='text' placeholder='username' />
        </Form.Group>
        <Form.Group controlId='formpassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} type='password' placeholder='username' />
        </Form.Group>
        <Button type='submit'>LogIn</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
