import { Dispatch } from "redux";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export interface Action<Payload> {
  readonly type: string;
  readonly payload: Payload;
}

export interface UsernamePayload {
  readonly username: string;
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
