import React from 'react';
import ReactDOM from 'react-dom';
import apiHandler from './apiHandler';
import './index.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getSampleData = this.getSampleData.bind(this);
  }

  getSampleData() {
    apiHandler.sampleCall().then((response) => {
      this.setState({
        response: response.data.data,
      });
    });
  }

  componentDidMount() {
    this.getSampleData();
  }

  render() {
    return <div className="mainDiv">{this.state.response}</div>;
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

export default Main;
