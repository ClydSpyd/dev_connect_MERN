import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, PROFILE_EDIT_SUCCESS, PROFILE_EDIT_FAILURE, UPDATE_PROFILE, DELETE_EXPERIENCE, DELETE_EDUCATION, GET_PROFILES, GET_REPOS } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
  loading: true
}

export default function(state=initialState, action) {

  const { type, payload } = action;

  switch(type){

    case GET_PROFILE:
    case UPDATE_PROFILE:
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    
    
    case PROFILE_EDIT_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: true
      };

    case PROFILE_EDIT_FAILURE:
    case PROFILE_ERROR:
      return{
        ...state,
        profile: null,
        error: payload,
        loading: false
      };

    case 'GITHUB_ERROR':
      return{
        ...state,
        error: payload,
        loading: false
      };

      case CLEAR_PROFILE:
        return{
          ...state,
          profile:null,
          repos:[],
          loading:true
        }

    default:
      return state;
  }
}