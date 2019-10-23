import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AboutCoomponent from './components/About';
import RegisterComponent from './components/Register';
import AppNavbar from './components/AppNavbar';
import PrivateRoute from './components/Routing/PrivateRoute';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Login from './components/Login';
import NewPost from './components/NewPost';
import Post from './components/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <AppNavbar></AppNavbar>
          <Switch>
            <Route exact path='/' component={AboutCoomponent} />
            <Route exact path='/register' component={RegisterComponent} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/post' component={NewPost} />
            <PrivateRoute exact path='/posts/:id/' component={Post} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
