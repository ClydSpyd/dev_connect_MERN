import axios from 'axios'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR, PROFILE_EDIT_SUCCESS,  PROFILE_EDIT_FAILURE, UPDATE_PROFILE, DELETE_EXPERIENCE, DELETE_EDUCATION, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from './types'

// GET CURRENT USER'S PROFILE
export const getCurrentProfile = () => async dispatch => {

  dispatch({type:CLEAR_PROFILE})
  try {

    const res = await axios.get('http://localhost:5000/api/profile/me')

    console.log(res.data)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

  } catch (err) {

    console.log(err.response)
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
  }
}


// GET ALL PROFILES
export const getProfiles = () => async dispatch => {

  dispatch({ type: CLEAR_PROFILE })

  try {

    const res = await axios.get('http://localhost:5000/api/profile')

    console.log(res.data)

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })

  } catch (err) {

    console.log(err.response)
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
  }
}


// GET PROFILE BY ID
export const getProfileById = userId => async dispatch => {

  dispatch({ type: CLEAR_PROFILE })
  
  try {

    const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`)

    console.log(res.data)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

  } catch (err) {

    console.log(err.response)
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
  }
}


// GET GITHUB REPOS
export const getGithubRepos = userName => async dispatch => {


  try {

    const res = await axios.get(`http://localhost:5000/api/profile/github/${userName}`)

    console.log(res.data)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })

  } catch (err) {

    console.log(err.response)
    dispatch({
      type: 'GITHUB_ERROR',
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
  }
}



//create profile
export const createProfile = ( profileObject, history, edit = false ) => async dispatch => {
  
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify( profileObject )
  
  try {
    

    const res = await axios.post('http://localhost:5000/api/profile', body, config);

    console.log(res)
    dispatch({
      type: PROFILE_EDIT_SUCCESS,
      payload: res.data
    })

    dispatch( setAlert( edit ? 'Profile updated' : 'Profile created', 'success'))

    if(!edit){setTimeout(()=>{ history.push("/dashboard") },500)}
    
    
  } catch (err) {

    const errors = err&&err.response ? err.response.data.errors : null;

    errors && errors.forEach(error => dispatch(setAlert(error.msg, 'warning')))

    dispatch({
      type:  PROFILE_EDIT_FAILURE
    })

  }
}

// add experience 
export const addExperience = ( profileObject, history ) => async dispatch => {
  
  
  const config = { headers: { 'Content-Type': 'application/json' } }

  console.log(profileObject)
  
  try {
    

    const res = await axios.put('http://localhost:5000/api/profile/experience', profileObject, config);

    console.log(res)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch( setAlert('Experience added', 'success'))    
    history.push("/dashboard")
    
  } catch (err) {

    const errors = err&&err.response ? err.response.data.errors : null;

    errors && errors.forEach(error => dispatch(setAlert(error.msg, 'warning')))

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })

  }
}

// delete experience 
export const deleteExperience =  expId => async dispatch => {
  
  
  try {
    

    const res = await axios.delete(`http://localhost:5000/api/profile/experience/${expId}`);

    console.log(res)

    dispatch({
      type: DELETE_EXPERIENCE,
      payload: res.data
    })

    dispatch( setAlert('Experience removed', 'success'))    
    
  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })

  }
}

// add education 
export const addEducation = ( profileObject, history ) => async dispatch => {
  
  const config = { headers: { 'Content-Type': 'application/json' } }
  
  try {
    

    const res = await axios.put('http://localhost:5000/api/profile/education', profileObject, config);

    console.log(res)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch( setAlert('Education added'))    
    history.push("/dashboard")
    
  } catch (err) {

    const errors = err&&err.response ? err.response.data.errors : null;

    errors && errors.forEach(error => dispatch(setAlert(error.msg, 'warning')))

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })

  }
}

// delete education 
export const deleteEducation = eduId  => async dispatch => {
  
  
  try {
    

    const res = await axios.delete(`http://localhost:5000/api/profile/education/${eduId}`);

    console.log(res)

    dispatch({
      type: DELETE_EDUCATION,
      payload: res.data
    })

    dispatch( setAlert('Education removed', 'success'))   
    
  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })

  }
}

// delete account and profile 
export const deleteAccount = ()  => async dispatch => {
  
  if(window.confirm('Are you sure? This can NOT be undone')){

    try {
    

      const res = await axios.delete(`http://localhost:5000/api/profile`);
  
      console.log(res)
  
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })
  
      dispatch( setAlert('Your account has been deleted', 'warning'))   
      
    } catch (err) {
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
      })
  
    }
  }
}
