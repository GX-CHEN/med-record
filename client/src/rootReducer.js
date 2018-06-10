import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import credential from './reducer/credential';
import doctor from './reducer/doctor';

export default combineReducers({
  router: routerReducer,
  credential,
  doctor
});
