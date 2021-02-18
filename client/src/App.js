import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

// redux stuff
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';

const token = localStorage.getItem('t');
if(token) setAuthToken(token)


const App= () => {

  
  useEffect(()=>{ store.dispatch(loadUser()) },[])

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component ={Landing} />

            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/login" component ={Login} />
                <Route exact path="/register" component ={Register} />
                <Route exact path="/dashboard" component ={Dashboard} />
                <PrivateRoute exact path="/edit-profile/:isCreate?" component ={CreateProfile} />
                {/* <PrivateRoute exact path="/dashboard" component ={Dashboard} /> */}
              </Switch>
            </section>

        </>
      </Router>
    </Provider>
  );
}

export default App;
