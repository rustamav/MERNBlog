import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AboutCoomponent from './components/AboutCoomponent';
import RegisterComponent from './components/RegisterComponent';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

    <Provider store={store}>
      <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component = {AboutCoomponent}/>
          <Route exact path='/register' component = {RegisterComponent}/>
        </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
