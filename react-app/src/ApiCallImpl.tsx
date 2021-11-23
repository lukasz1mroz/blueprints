import axios from 'axios';

const api = {
  getCall: () => axios.get('http://localhost:3000/test'),
  postCall: () => 'TODO',
};

export default api;
