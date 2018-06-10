import { ADD_MED_FULFILLED, DELETE_MED_FULFILLED, LIST_MED_FULFILLED } from '../const/doctor';

const initialState = {};

/**
 * This reducer handles the result of all the action that Doctor can have:
 * 1. manage medicine
 * 2. See the medicine intake history
 */
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
