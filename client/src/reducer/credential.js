import { LOGIN_FULFILLED, LOGOUT_FULFILLED, REGISTER_FULFILLED } from '../const/credential';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_FULFILLED: {
      return {
        ...state,
        payload,
        nextPage: 'scheduleList'
      };
    }
    case LOGOUT_FULFILLED: {
      return {};
    }
    case REGISTER_FULFILLED: {
      return {
        ...state,
        payload,
        nextPage: 'login'
      };
    }

    default:
      return state;
  }
};
