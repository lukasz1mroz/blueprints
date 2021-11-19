import axios, { AxiosRequestConfig } from 'axios';

const api = {
  sampleCall: (config: AxiosRequestConfig) => axios.get('http://localhost:3000/test', config),
};

export default api;
