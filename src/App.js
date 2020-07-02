import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';




class App extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
    );
  }

}



export default App;
