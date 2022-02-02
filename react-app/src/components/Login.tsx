import PropTypes from 'prop-types';
import { useState } from 'react';
import api from '../ApiCalls';

import '../styles/Login.css';

const Login = ({ setToken }: any) => {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await api.login(username as string, password as string);
    setToken(response.data.accessToken);
  };

  return (
    <div className="loginWrapper">
      <h2>Please log in</h2>
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
