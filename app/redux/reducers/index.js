import {combineReducers} from 'redux';
import appState from './AppState';
import user from './UserState';

const rootReducer = combineReducers({
  appState,
  user,
});

export default rootReducer;
