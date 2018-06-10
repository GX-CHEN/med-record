import { ADD_MED, LIST_MED_HISTORY } from '../const/doctor';
import { addMedService, listMedHistoryService } from '../model/apiService';

export const addMed = (values) => {
  return dispatch => {
    dispatch({
      type: ADD_MED,
      payload: addMedService(values)
    });
  };
};

export const listMedHistory = (values) => {
  return dispatch => {
    dispatch({
      type: LIST_MED_HISTORY,
      payload: listMedHistoryService(values)
    });
  };
};
