import { ADD_TIME } from '../const/patient';
import { reportTimeService } from '../model/apiService';

export const reportTime = (userId, dateString) => {
  return dispatch => {
    dispatch({
      type: ADD_TIME,
      payload: reportTimeService(userId, dateString)
    });
  };
};
