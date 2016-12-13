import React, { Component } from 'react';
import '../css/App.css';
import Display from './display.js';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Display />
      </div>
    );
  }
}

export default App;
