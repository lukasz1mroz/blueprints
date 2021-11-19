import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MainContent from './MainContent';
import './Styles.css';

class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
        </Routes>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

export default Main;
