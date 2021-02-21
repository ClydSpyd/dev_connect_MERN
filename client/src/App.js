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
import AddExperience from './components/profile-forms/AddExperience';
import { addEducation } from './actions/profile';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

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
                <Route exact path="/profiles" component ={Profiles} />
                <Route exact path="/profile/:userId" component ={Profile} />
                <PrivateRoute exact path="/edit-profile/:isCreate?" component ={CreateProfile} />
                <PrivateRoute exact path="/add-experience" component ={AddExperience} />
                <PrivateRoute exact path="/add-education" component ={AddEducation} />
                <PrivateRoute exact path="/posts" component ={Posts} />
                <PrivateRoute exact path="/post/:postId" component ={Post} />
                {/* <PrivateRoute exact path="/dashboard" component ={Dashboard} /> */}
              </Switch>
            </section>

        </>
      </Router>
    </Provider>
  );
}

export default App;
