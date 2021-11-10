import axios from 'axios';

const apiHandler = {
  sampleCall: () => axios.get('http://localhost:3000/test'),
};

export default apiHandler;
