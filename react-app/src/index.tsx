import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainContent from './components/MainContent';
import useToken from './hooks/useToken';
import Login from './components/Login';
import './styles/index.css';

const Main = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

export default Main;
