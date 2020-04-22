import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertsReducer from "./alertsReducer";

export default combineReducers({ user: userReducer, alerts: alertsReducer });
