import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Todo from './components/Task/Todo';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './Utilis/PrivateRoute';
import NotFound from './components/layout/NotFound';
import API from './Utilis/API';
import './App.css';
import Header from './components/layout/Header';

function App() {
  API();
  return (
    <Router>
      <Fragment>
        <Container className='vh-100 '>
          <Header />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/' component={Todo} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  );
}

export default App;
