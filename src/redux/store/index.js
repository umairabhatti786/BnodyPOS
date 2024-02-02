import { configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunkMiddleware from "redux-thunk";
import authReducer from "../reducers/authReducer";
import GroupChatReduser from "../reducers/GroupChatReduser";
import userReducer from "../reducers/userReducer";

import advanceSearch from "../reducers/advanceSearch";
import ReportUserReducer from "../reducers/ReportUserReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  groupChat: GroupChatReduser,
  user: userReducer,
  advanceSearch: advanceSearch,
  report: ReportUserReducer,
});
const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
