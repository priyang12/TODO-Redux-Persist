import axios from 'axios';

const API = () => {
  axios.defaults.baseURL = '/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};
export default API;
