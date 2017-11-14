import React, { Component } from 'react';
import CurrencyConverter from './components/CurrencyConverter.js';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="cc">
        <CurrencyConverter />
      </div>
    );
  }
}

export default App;
