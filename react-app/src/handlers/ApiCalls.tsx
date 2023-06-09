import axios from 'axios';

const api = {
  login: (username: string, password: string) =>
    axios.get('/api/login', {
      auth: { username: username, password: password },
    }),
  getPosts: (authToken: string) =>
    axios.get('/api/getPosts', {
      headers: { Authorization: `Bearer ${authToken}` },
    }),
};

export default api;
