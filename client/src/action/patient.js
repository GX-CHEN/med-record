import { ADD_TIME, CHECK_WETHER_REPORTED } from '../const/patient';
import { reportTimeService, checkWetherReportedService } from '../model/apiService';

export const reportTime = (userId, dateString) => {
  return dispatch => {
    dispatch({
      type: ADD_TIME,
      payload: reportTimeService(userId, dateString)
    });
  };
};

export const checkWetherReported = (userId, dateString) => {
  return dispatch => {
    dispatch({
      type: CHECK_WETHER_REPORTED,
      payload: checkWetherReportedService(userId, dateString)
    });
  };
};
