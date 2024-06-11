import * as t from './actionTypes';

// this is what our action should look like which dispatches the "payload" to reducer
export const setLoginState = (loginData) => {
  return {
    type: t.SET_LOGIN_STATE,
    payload: loginData,
  };
};