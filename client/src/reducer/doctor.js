import { ADD_MED_FULFILLED, DELETE_MED_FULFILLED, LIST_MED_FULFILLED } from '../const/doctor';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_MED_FULFILLED: {
      return {
        ...state,
        medList: payload.medList
      };
    }
    case DELETE_MED_FULFILLED: {
      return {
        ...state,
        medList: payload.medList
      };
    }
    case LIST_MED_FULFILLED: {
      return {
        ...state,
        medList: payload.medList
      };
    }

    default:
      return state;
  }
};
