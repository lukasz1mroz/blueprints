import axios from 'axios';

const api = {
  getCall: () => axios.get('http://localhost:3000/testGet'),
  postCall: () => axios.post('http://localhost:3000/testPost'),
};

export default api;
