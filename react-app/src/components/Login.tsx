import PropTypes from 'prop-types';
import { useState } from 'react';
import api from '../handlers/ApiCalls';

import '../styles/Login.css';

const Login = ({ setToken }: any) => {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const response = await api.login(username as string, password as string);
      setToken(response.data.accessToken);
    } catch (err) {
      setError(err as any)
    }
  };

  return (
    <div className="loginWrapper">
      <h2>{error ? 'Incorrect credentials, please try again' : 'Please log in'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="buttonWrapper">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
