import * as actionTypes from "../actions/actionTypes";
// import cloneDeep from "lodash/cloneDeep";

const initialState = {
  name: null,
  id: null,
  token: null,
  email: null,
  avatar: null,
  following: null,
  pending: null,
  errorLogin: null,
  errorSignup: null,
  cover: null,
  followers: null,
  requests: null,
};

const successAuth = (state, action) => ({
  ...state,
  name: action.data.data.name,
  id: action.data.data._id,
  email: action.data.data.email,
  token: action.data.access_token,
  avatar: action.data.data.avatar,
  cover: action.data.data.cover,
  followers: action.data.data.followers,
  requests: action.data.data.requests,
  following: action.data.data.following,
  pending: action.data.data.pending,
});

const failAuth = (state, action) => ({
  ...state,
  errorLogin: action.error.message,
});
const failSignup = (state, action) => ({
  ...state,
  errorSignup: action.error.message,
});

const successFollowSystem = (state, action) => {
  localStorage.setItem(
    "followers",
    JSON.stringify(action.data.data.currentUser.followers)
  );
  localStorage.setItem(
    "requests",
    JSON.stringify(action.data.data.currentUser.requests)
  );
  localStorage.setItem(
    "following",
    JSON.stringify(action.data.data.currentUser.following)
  );
  localStorage.setItem(
    "pending",
    JSON.stringify(action.data.data.currentUser.pending)
  );
  return {
    ...state,
    following: action.data.data.currentUser.following,
    followers: action.data.data.currentUser.followers,
    pending: action.data.data.currentUser.pending,
    requests: action.data.data.currentUser.requests,
  };
};

const authLogout = () => initialState;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_AUTH:
      return successAuth(state, action);
    case actionTypes.FAIL_AUTH:
      return failAuth(state, action);
    case actionTypes.FAIL_SIGNUP:
      return failSignup(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SUCCESS_FOLLOW_SYSTEM:
      return successFollowSystem(state, action);
    default:
      return state;
  }
};
export default reducer;
