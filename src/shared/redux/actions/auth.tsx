import { Dispatch } from "redux";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGGING_OUT,
  LOGOUT_FAILED,
  LOGOUT_SUCESS
} from "../constants/constants";

export interface Action<Payload> {
  readonly type: string;
  readonly payload: Payload;
}

export interface UsernamePayload {
  readonly username: string;
}

export interface ErrorPayLoad {
  readonly error: string;
}

export const loginStart: () => Action<null> = () => ({
  type: LOGIN_START,
  payload: null
});

export const loginSuccess: (username: string) => Action<UsernamePayload> = (
  username: string
) => ({
  type: LOGIN_SUCCESS,
  payload: {
    username
  }
});

export const loginFail: () => Action<null> = () => ({
  type: LOGIN_FAIL,
  payload: null
});

export const logoutStart: () => Action<null> = () => ({
  type: LOGGING_OUT,
  payload: null
});

export const logoutSuceed: () => Action<null> = () => ({
  type: LOGOUT_SUCESS,
  payload: null
});

export const logoutFailed: (error: string) => Action<ErrorPayLoad> = (
  error: string
) => ({
  type: LOGOUT_FAILED,
  payload: {
    error
  }
});

export const loginRequest: (
  username: string,
  password: string
) => (dispatch: Dispatch) => Promise<void> = (
  username: string,
  password: string
) => dispatch => {
  dispatch(loginStart());
  return Promise.resolve(true) // TODO: send API request for login
    .then(__ => {
      dispatch(loginSuccess(username));
    })
    .catch(__ => {
      dispatch(loginFail());
    });
};
