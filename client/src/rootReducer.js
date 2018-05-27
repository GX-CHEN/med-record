import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import credential from './reducer/credential';

export default combineReducers({
  router: routerReducer,
  credential,
});
