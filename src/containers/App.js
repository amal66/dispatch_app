import React, { Component } from 'react';
import './App.css';

import Main from '../components/Main/Main'

class App extends Component {
  state = {
    screen: 'main'
  }
  render() {
    return (
      <div className="App">
        { this.state.screen == 'main' ?
          <Main /> : null
        }
      </div>
    );
  }
}

export default App;
