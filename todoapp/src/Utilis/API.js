import axios from 'axios';
import setAuthToken from '../Utilis/SetAuthToken';
import { useSelector } from 'react-redux';

const API = () => {
  const AuthState = useSelector((state) => state.Auth);
  const { Token } = AuthState;
  if (Token) {
    setAuthToken(Token);
  }
  axios.defaults.baseURL = '/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};
export default API;
