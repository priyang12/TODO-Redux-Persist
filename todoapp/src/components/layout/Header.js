import React from 'react';
import { Fragment } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../Constants/AuthConstants';
import { PURGE } from 'redux-persist';
const Header = () => {
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.Auth);
  const { isAuth } = AuthState;
  const logout = (e) => {
    e.preventDefault();
    dispatch({
      type: LOGOUT,
    });

    dispatch({
      type: PURGE,
      key: 'root',
      result: () => null,
    });
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <h1 className='text-center'>TODO LIST</h1>
        </Col>
        {isAuth && (
          <Col>
            <Button onClick={logout}>Logout</Button>
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

export default Header;
