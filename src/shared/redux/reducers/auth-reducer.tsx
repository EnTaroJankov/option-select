import { Action } from "../actions/auth";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from "../constants/constants";

export interface AuthStateT {
  username: string;
  isLoggingIn: boolean;
  authFailed: boolean;
  isLoggingOut: boolean;
}

const defaultState = {
  username: null,
  isLoggingIn: false,
  authFailed: false,
  isLoggingOut: false
};

export default function authReducer(state = defaultState, action: Action<any>) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        isLoggingIn: false,
        authFailed: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        username: null,
        isLoggingIn: false,
        authFailed: true
      };
    case LOGOUT_START:
      return {
        ...state,
        isLoggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        username: null,
        isLogginIn: false,
        authFailed: false,
        isLoggingOut: false
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        isLoggingOut: false
      };
  }
  return state;
}
