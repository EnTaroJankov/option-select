import { combineReducers } from "redux";
import authReducer, { AuthStateT } from "./auth-reducer";

export interface StateT {
  auth: AuthStateT;
}

export default combineReducers({
  auth: authReducer
});
