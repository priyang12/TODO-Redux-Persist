import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_ERROR,
  LOAD_USER,
  SET_LOADING,
  SET_ALERT,
  CLEAN_ALERT,
  LOGOUT,
} from '../Constants/AuthConstants';

const initstate = {
  isAuth: false,
  loading: false,
  user: null,
  Token: null,
  alert: null,
};

// eslint-disable-next-line
export const AuthReducer = (state = initstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
    case REGISTER_USER:
      return {
        ...state,
        Token: payload,
        loading: false,
        alert: null,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuth: true,
        user: payload,
        loading: false,
        alert: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem('persist:root');
      state = undefined;
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
        loading: false,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        alert: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
