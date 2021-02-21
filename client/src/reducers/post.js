import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  LIKE_POST,
  MAKE_COMMENT,
  DELETE_COMMENT,
  POST_ERROR
} from '../actions/types'

const initialState = {
  posts:[],
  post:null,
  loading:true,
  error:{}
}

export default function(state=initialState, action){

  const { type, payload } = action;
  
  switch(type){
    case GET_POSTS:
      return {
        ...state,
        posts:payload,
        post:null,
        loading:false
      };

    case GET_POST:
      return {
        ...state,
        post:payload,
        loading:false
      };

    case ADD_POST:
      return{
        ...state,
        posts:[payload, ...state.posts],
        loading:false
      }

    case LIKE_POST:
      // const postIdx = state.posts.map(post => post._id).indexOf(payload.postId)
      // state.posts[postIdx].likes=payload.likes;
      return{
        ...state,
        posts: state.posts.map(post => post._id === payload.postId ? {...post, likes: payload.likes} : post),
        loading:false
      }
    
    case MAKE_COMMENT:
    case DELETE_COMMENT:
      return{
        ...state,
        post: payload,
        loading: false
      }

    case DELETE_POST:
      return{
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading:false
      }

    case POST_ERROR:
      return{
        ...state,
        error:payload,
        loading: false
      }

    default:
      return state
  }
}