import * as actionTypes from "../actions/actionTypes";
import defoultProfilePic from "../../assets/images/avatar.png";
// import cloneDeep from "lodash/cloneDeep";

const initialState = {
  name: null,
  id: null,
  token: null,
  email: null,
  avatar: null,
};

const successAuth = (state, action) => {
  let avatar = defoultProfilePic;
  !action.data.avatar && (avatar = action.data.avatar);
  return {
    name: action.data.name,
    id: action.data.id,
    email: action.data.email,
    avatar: avatar,
    token: action.data.access_token,
  };
};

const authLogout = () => initialState;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_AUTH:
      return successAuth(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};
export default reducer;
