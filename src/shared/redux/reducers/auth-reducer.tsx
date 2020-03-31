import { Action } from "../actions/auth";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../constants/constants";

export interface AuthStateT {
  username: string;
  isLoggingIn: boolean;
  authFailed: boolean;
}

const defaultState = {
  username: null,
  isLoggingIn: false,
  authFailed: false
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
        username: action.payload.username,
        isLoggingIn: false,
        authFailed: false
      };
    case LOGIN_FAIL:
      return {
        username: null,
        isLoggingIn: false,
        authFailed: true
      };
  }
  return state;
}
