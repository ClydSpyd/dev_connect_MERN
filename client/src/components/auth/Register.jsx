import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { setAlert, setAlertSimple } from '../../actions/alert';
import { registerUser } from '../../actions/auth';
import PropTypes from 'prop-types';

export const Register = ({ setAlert, registerUser, isAuthenticated }) => {

  const [ formData, setFormData ] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch()
  const handleChange = e => setFormData({...formData, [e.target.name]:e.target.value})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password!==password2){
      
      setAlert('Passwords do not match', 'danger')
      // dispatch( setAlertSimple('Passwords do not match', 'danger'))

    } else {

      const newUser = { name, email, password }
      registerUser(newUser)
      // store.dispatch( registerUser(newUser) ) 
     
    }

  }


  // redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/dashboard" />
   }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <input 
            value={name}
            onChange={(e) => handleChange(e)}
            type="text" 
            placeholder="Name" 
            name="name" 
           />
        </div>
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
          <input
            value={password2}
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, {setAlert, registerUser} )(Register)
{/* export default Register */}





























{/* 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAyYzJjYWFmZTcxNjcxN2VjNDRlZGM1IiwibmFtZSI6IkRhdmlkIENseWRlc2RhbGUifSwiaWF0IjoxNjEzNTA3NzU0LCJleHAiOjE2MTcxMDc3NTR9.KUw1FNHH9VsDe1uhOLd4S_bA3NUVk82ecBPYmWXJlxQ" */}

{/* 
const newUser = { name, email, password }
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify(newUser)

    const res = await axios.post('http://localhost:5000/api/users', body, config);

    console.log(res.data)
    
  } catch (err) {
    
    console.log(err.response.data)
  } */}
