import { ADD_TIME_FULFILLED, CHECK_WETHER_REPORTED_FULFILLED, CLEAR_REPORTING_DATA } from '../const/patient';

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
    case CLEAR_REPORTING_DATA: {
      return {
        ...state,
        reportSucceed: '',
        isAlreadyReported: ''
      };
    }
    default:
      return { ...state };
  }
};
