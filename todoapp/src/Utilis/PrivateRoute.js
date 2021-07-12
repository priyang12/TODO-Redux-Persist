import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const AuthState = useSelector((state) => state.Auth);
  const { isAuth, loading } = AuthState;
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div>Loading</div>
        ) : isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
