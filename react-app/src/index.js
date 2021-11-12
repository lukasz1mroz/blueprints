import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MainContent from './MainContent';
import api from './ApiHandler';
import './Styles.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getSampleData = this.getSampleData.bind(this);
  }

  getSampleData() {
    api.sampleCall().then((response) => {
      this.setState({
        response: response.data.data,
      });
    });
  }

  componentDidMount() {
    this.getSampleData();
  }

  render() {
    return (
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<MainContent data={this.state.data} />} />
        </Routes>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

export default Main;
