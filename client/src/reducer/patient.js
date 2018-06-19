import { ADD_TIME_FULFILLED, CHECK_WETHER_REPORTED_FULFILLED } from '../const/patient';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TIME_FULFILLED: {
      return {
        ...state,
        reportSucceed: payload
      };
    }
    case CHECK_WETHER_REPORTED_FULFILLED: {
      return {
        ...state,
        isAlreadyReported: payload
      };
    }
    default:
      return { ...state };
  }
};
