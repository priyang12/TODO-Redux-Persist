import {
  LOGIN_USER,
  REGISTER_USER,
  LOAD_USER,
  SET_LOADING,
  // AUTH_ERROR,
  SET_ALERT,
  CLEAN_ALERT,
} from '../Constants/AuthConstants';

import axios from 'axios';
import setAuthToken from '../Utilis/SetAuthToken';

export const LoadUser = (token) => async (dispatch) => {
  try {
    if (token) {
      setAuthToken(token);
      const { data } = await axios.get('/users/login');

      dispatch({
        type: LOAD_USER,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: error?.response?.data?.msg || 'SERVER ERROR',
    });
    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT,
      });
    }, 5000);
  }
};

export const LoginUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const { data } = await axios.post('/users/login', user);

    dispatch({
      type: LOGIN_USER,
      payload: data?.token,
    });

    dispatch(LoadUser(data.token));
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: error?.response?.data?.msg,
    });
  }
};

export const RegisterUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const { data } = await axios.post('/users/register', user);

    dispatch({
      type: REGISTER_USER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: error?.response?.data?.msg || 'Server Error',
    });
  }
};
