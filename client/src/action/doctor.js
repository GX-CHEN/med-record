import { ADD_MED, DELETE_MED, LIST_MED, LIST_MED_HISTORY } from '../const/doctor';
import { addMedService, deleteMedService, listMedService, listMedHistoryService } from '../model/apiService';

export const addMed = medName => {
  return dispatch => {
    dispatch({
      type: ADD_MED,
      payload: addMedService(medName)
    });
  };
};

export const deleteMed = medId => {
  return dispatch => {
    dispatch({
      type: DELETE_MED,
      payload: deleteMedService(medId)
    });
  };
};

export const listMed = () => {
  return dispatch => {
    dispatch({
      type: LIST_MED,
      payload: listMedService()
    });
  };
};

export const listMedHistory = values => {
  return dispatch => {
    dispatch({
      type: LIST_MED_HISTORY,
      payload: listMedHistoryService(values)
    });
  };
};
