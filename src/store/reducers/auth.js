import * as actionTypes from "../actions/actionTypes";
import defoultProfilePic from "../../assets/images/avatar.jpg";
// import cloneDeep from "lodash/cloneDeep";

const initialState = {
  name: null,
  id: null,
  token: null,
  email: null,
  avatar: null,
  errorLogin: null,
  errorSignup: null,
};

const successAuth = (state, action) => {
  let avatar = defoultProfilePic;
  action.data.avatar && (avatar = action.data.avatar);
  return {
    name: action.data.name,
    id: action.data.id,
    email: action.data.email,
    avatar: avatar,
    token: action.data.access_token,
    following: action.data.following,
    pending: action.data.pending,
  };
};

const failAuth = (state, action) => ({
  ...state,
  errorLogin: action.error.message,
});
const failSignup = (state, action) => ({
  ...state,
  errorSignup: action.error.message,
});

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
    default:
      return state;
  }
};
export default reducer;
