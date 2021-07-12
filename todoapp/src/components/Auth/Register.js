import React, { Fragment } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from '../../Utilis/form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Spinner from '../layout/Spinner';
import Message from '../layout/Message';
import { RegisterUser } from '../../Actions/AuthAction';

const Login = () => {
  const AuthState = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const { isAuth, loading, alert } = AuthState;

  const [user, setuser] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = user;
  const register = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(RegisterUser(user));
  };
  if (isAuth) {
    return <Redirect to='/' />;
  }
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {alert && <Message variant='danger'>{alert}</Message>}
      <Container id='Auth'>
        <Form onSubmit={register}>
          <h1 className='font-weight-bold text-center'>Register</h1>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Your name'
              name='name'
              onChange={setuser}
              value={name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
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
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              as='input'
              type='password'
              name='password2'
              onChange={setuser}
              value={password2}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100'>
            Submit
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default Login;
