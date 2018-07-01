import { ADD_TIME, CHECK_WETHER_REPORTED, CLEAR_REPORTING_DATA } from '../const/patient';
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

export const clearReportingData = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_REPORTING_DATA,
      payload: ''
    });
  };
};
