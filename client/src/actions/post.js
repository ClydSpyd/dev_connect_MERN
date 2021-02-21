import 'axios'
import axios from 'axios'
import { setAlert } from './alert'
import { GET_POSTS, POST_ERROR, LIKE_POST, DELETE_POST, ADD_POST, GET_POST, MAKE_COMMENT, DELETE_COMMENT } from './types'


// GET ALL POSTS
export const getPosts = () => async dispatch => {
  console.log('getPosts')

  try {

    const res = await axios.get('/api/posts');

    console.log('res')
    console.log(res)

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
    
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
    
  }
}

// GET POST by id
export const getPost = postId => async dispatch => {
  
  console.log('getPost')

  try {

    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    })
    
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
    
  }
}

// LIKE POST 
export const likePost = (postId) => async dispatch => {

  try {

    const res = await axios.put(`/api/posts/like/${postId}`);

    console.log(res)

    dispatch({
      type: LIKE_POST,
      payload: {
        likes: res.data,
        postId: postId
      }
    })
    
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
    
  }
}

// DELETE POST 
export const deletePost = postId => async dispatch => {

  try {

    const res = await axios.delete(`/api/posts/${postId}`);

    console.log(res)

    dispatch({ 
      type: DELETE_POST,
      payload: postId 
    })
    
    dispatch( setAlert('Post removed', 'success'))
    
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
    
  }
}

// ADD POST 
export const addPost = formData => async dispatch => {


  const config = { headers: { 'Content-Type': 'application/json' } }

  console.log(formData)

  try {

    const res = await axios.post(`/api/posts`, formData, config);

    console.log(res)

    dispatch({ 
      type: ADD_POST,
      payload: res.data 
    })
    
    dispatch( setAlert('Post created', 'success'))
    
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
    
  }
}



// COMMENT ON POST 
export const makeComment = (postId, text) => async dispatch => {

  const config = { headers: { 'Content-Type': 'application/json' } }

  try {

    const res = await axios.post(`/api/posts/comment/${postId}`, text, config);

    console.log(res)

    dispatch({
      type: MAKE_COMMENT,
      payload: res.data
    })
    
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
    
  }
}


// DELETE COMMENT 
export const deleteComment = (postId, commentId) => async dispatch => {

  try {

    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    console.log(res)

    dispatch({ 
      type: DELETE_COMMENT,
      payload: res.data 
    })
    
    dispatch( setAlert('Comment removed', 'success'))
    
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response && err.response.data.msg , status: err.response && err.response.status }
    })
    
  }
}