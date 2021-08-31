import * as actionTypes from "./actionTypes";

export const successAuth = (data) => ({
  type: actionTypes.SUCCESS_AUTH,
  data: data,
});

export const failAuth = (error) => ({
  type: actionTypes.FAIL_AUTH,
  error: error,
});

export const failSignup = (error) => ({
  type: actionTypes.FAIL_SIGNUP,
  error: error,
});

export const auth = (data) => ({
  type: actionTypes.AUTH,
  data: data,
});

export const authLogout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });

export const authLogoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_STATE,
});

export const checkAuthTimeout = (expirationTime) => ({
  type: actionTypes.CHECK_AUTH_TIMEOUT,
  expirationTime: expirationTime,
});

export const currentUser = () => ({
  type: actionTypes.CURRENT_USER,
});
