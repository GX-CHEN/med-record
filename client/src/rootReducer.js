import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import credential from './reducer/credential';
import doctor from './reducer/doctor';
import patient from './reducer/patient';

export default combineReducers({
  router: routerReducer,
  credential,
  doctor,
  patient
});
