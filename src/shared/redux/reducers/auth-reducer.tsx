import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  Action
} from "../actions/auth";

export interface AuthStateT {
  username: string;
  authFailed: boolean;
}

const defaultState = {
  username: null,
  authFailed: false
};

export default function authReducer(state = defaultState, action: Action<any>) {
  switch (action.type) {
    case LOGIN_START:
      // TODO: perform backend call to authenticate and dispatch login success / failure action
      return {
        username: action.payload.username,
        authFailed: false
      };
    case LOGIN_SUCCESS:
      return {
        username: action.payload.username,
        authFailed: false
      };
    case LOGIN_FAIL:
      return {
        username: null,
        authFailed: true
      };
  }
  return state;
}
