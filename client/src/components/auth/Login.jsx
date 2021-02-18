import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../../store';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';

export const Login = ({ loginUser, isAuthenticated }) => {

  const [ formData, setFormData ] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })

  const { email, password } = formData;

  const handleChange = e => setFormData({...formData, [e.target.name]:e.target.value})

  const handleSubmit = async (e) => {

      e.preventDefault()
      const user = { email, password }
      // store.dispatch( loginUser(user) )
      loginUser(user)

  }

  // redirect if logged in
  if(isAuthenticated){
   return <Redirect to="/dashboard" />
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign In To Your Account</p>
      <form className="form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <input 
            value={email}
            onChange={(e) => handleChange(e)}
            type="email" 
            placeholder="Email Address" 
            name="email" 
            />
          <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
        <div className="form-group">
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Not a member yet? <Link to="/register">Sign up for free!</Link>
      </p>
    </>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { loginUser })(Login)


{/* export default Login */}



{/* 
try {

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const body = JSON.stringify(user)

const res = await axios.post('http://localhost:5000/api/auth', body, config);

console.log(res.data)

} catch (err) {

console.log(err.response.data)
} */}
