import * as actionTypes from "./actionTypes";

export const successAuth = (data) => ({
  type: actionTypes.SUCCESS_AUTH,
  data: data,
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
