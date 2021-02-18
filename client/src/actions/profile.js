import axios from 'axios'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR, PROFILE_EDIT_SUCCESS,  PROFILE_EDIT_FAILURE } from './types'

// GET CURRENT USER'S PROFILE

export const getCurrentProfile = () => async dispatch => {

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
      payload: { msg: err.response.data.msg, status: err.response.status }
    })
  }
}


//create profile
export const createProfile = ( profileObject, history, edit = false ) => async dispatch => {

  const payload = edit ? {...profileObject, skills: profileObject.skills.join()} : profileObject 
 
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify( payload )
  
  try {
    

    const res = await axios.post('http://localhost:5000/api/profile', body, config);

    console.log(res)
    dispatch({
      type: PROFILE_EDIT_SUCCESS,
      payload: res.data
    })

    dispatch( setAlert( edit ? 'Profile updated' : 'Porfile created'))

    if(!edit){setTimeout(()=>{ history.push("/dashboard") },500)}
    
    
  } catch (err) {

    const errors = err&&err.response ? err.response.data.errors : null;

    errors && errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

    dispatch({
      type:  PROFILE_EDIT_FAILURE
    })

  }
}