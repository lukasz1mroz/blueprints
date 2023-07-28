import axios from "axios";

const backendUrl =
  process.env.REACT_APP_ENV === "local"
    ? ""
    : "http://bprints.us-east-1.elasticbeanstalk.com";

const api = {
  login: (username: string, password: string) =>
    axios.get(`${backendUrl}/api/login`, {
      auth: { username: username, password: password },
    }),
  getPosts: (authToken: string) =>
    axios.get(`${backendUrl}/api/getPosts`, {
      headers: { Authorization: `Bearer ${authToken}` },
    }),
};

export default api;
