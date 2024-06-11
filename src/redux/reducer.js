import { combineReducers } from "redux";
import * as t from './actionTypes';

const initialState = {
    isLoggedIn: false,
    id: '',
    nama: '',
    email: ''
  };

const loginReducer = (state = initialState, action) =>{
    switch (action.type) {
        case t.SET_LOGIN_STATE:
          return {
            ...state,
            ...action.payload, // this is what we expect to get back from API call and login page input
            isLoggedIn: true, // we set this as true on login
          };
        default:
          return state;
    }
}

const reducer = combineReducers({
    loginReducer
})

export default reducer;