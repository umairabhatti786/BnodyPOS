import { combineReducers } from 'redux';
//import appState from './AppState';
import user from './UserState';

const rootReducer = combineReducers({

  user,
});

export default rootReducer;
