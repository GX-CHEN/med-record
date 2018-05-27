import { LOGIN, LOGOUT, REGISTER } from '../const/credential';
import { loginService, registerService } from '../model/apiService';

export const register = (username, password) => {
  return dispatch => {
    return dispatch({
      type: REGISTER,
      payload: registerService(username, password)
    });
  };
};

export const login = (username, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN,
      payload: loginService(username, password)
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT,
      payload: loginService(null, null)
    });
  };
};
