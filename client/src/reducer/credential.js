import { LOGIN_FULFILLED, LOGOUT, REGISTER_FULFILLED } from '../const/credential';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_FULFILLED: {
      return {
        ...state,
        userId: payload.userId,
        doctorRole: payload.doctorRole,
        errorMessage: payload.errorMessage
      };
    }
    case LOGOUT: {
      return {
        ...state,
        userId: '',
        doctorRole: ''
      };
    }
    case REGISTER_FULFILLED: {
      return {
        ...state,
        userId: null,
        doctorRole: payload.doctorRole,
        errorMessage: payload.errorMessage
      };
    }

    default:
      return state;
  }
};
