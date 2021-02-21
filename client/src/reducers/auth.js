import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('t'),
  isAuthenticated: false,
  loading: true,
  user: null
}

export default function(state=initialState, action) {

  const { type, payload } = action

  switch(type){
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('t', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
  
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('t');
      return{
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
      
      case USER_LOADED:
        return{
          ...state,
          isAuthenticated:true,
          loading:false,
          user:payload
        }


    default:
      return state
  
  };

}