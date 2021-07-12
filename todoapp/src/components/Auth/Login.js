import React, { Fragment } from 'react';
import { useForm } from '../../Utilis/form';
import { Form, Button, Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../../Actions/AuthAction';
import Spinner from '../layout/Spinner';
import Message from '../layout/Message';
const Login = () => {
  const [user, setuser] = useForm({ email: '', password: '' });
  const { email, password } = user;

  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.Auth);

  const { isAuth, loading, alert } = AuthState;

  const login = (e) => {
    e.preventDefault();
    dispatch(LoginUser(user));
  };
  if (isAuth) {
    return <Redirect to='/' />;
  }
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {alert && <Message variant='danger'>{alert}</Message>}
      <Container lg={2} className='mw-50' id='Auth'>
        <h1 className='font-weight-bold text-center'>Login</h1>
        <Form onSubmit={login}>
          <Form.Group>
            <Form.Label>Enter EmailAddress</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={setuser}
              value={email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              onChange={setuser}
              value={password}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100'>
            Submit Task
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default Login;
