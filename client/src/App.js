import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import TestComonent from './components/AboutCoomponent';

function App() {
  return (
    <Provider store = {store}>
    <div className="App">
      <h1>Blog</h1>
      <TestComonent></TestComonent>
    </div>
    </Provider>
  );
}

export default App;
