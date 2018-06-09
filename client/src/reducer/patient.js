import { ADD_TIME_FULFILLED } from '../const/patient';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TIME_FULFILLED: {
      return {
        ...state,
        payload,
      };
    }

    default:
      return state;
  }
};
