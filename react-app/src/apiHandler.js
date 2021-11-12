import axios from 'axios';

const api = {
  sampleCall: () => axios.get('http://localhost:3000/test'),
};

export default api;
