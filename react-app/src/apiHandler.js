import axios from 'axios';

const apiHandler = {
  sampleCall: () => axios.get('/test'),
};

export default apiHandler;
