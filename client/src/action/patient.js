import { ADD_TIME } from '../const/patient';
import { addTimeService } from '../model/apiService';

export const addTime = (values) => {
  return dispatch => {
    dispatch({
      type: ADD_TIME,
      payload: addTimeService(values)
    });
  };
};
