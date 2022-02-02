import axios from 'axios';

const api = {
  login: (username: string, password: string) =>
    axios.get('http://localhost:3000/login', { auth: { username: username, password: password } }),
};

export default api;
