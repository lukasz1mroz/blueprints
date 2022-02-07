import axios from 'axios';

const api = {
  login: (username: string, password: string) =>
    axios.get('http://ec2-3-84-185-71.compute-1.amazonaws.com:3000/login', {
      auth: { username: username, password: password },
    }),
  getPosts: (authToken: string) =>
    axios.get('http://ec2-3-84-185-71.compute-1.amazonaws.com:3000/getPosts', {
      headers: { Authorization: `Bearer ${authToken}` },
    }),
};

export default api;
