export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export interface Action<Payload> {
  readonly type: string;
  readonly payload: Payload;
}

export interface LoginStartPayload {
  readonly username: string;
  readonly password: string;
}

export interface UsernamePayload {
  readonly username: string;
}

export const loginStart: (username: string, password: string) => Action<LoginStartPayload>
    = (username: string, password: string) => ({
  type: LOGIN_START,
  payload: {
    username,
    password,
  }
});

export const loginSuccess: (username: string) => Action<UsernamePayload> = (username: string) => ({
  type: LOGIN_SUCCESS,
  payload: {
    username,
  }
});

export const loginFail: (username: string) => Action<UsernamePayload> = (username: string) => ({
  type: LOGIN_FAIL,
  payload: {
    username,
  }
});
