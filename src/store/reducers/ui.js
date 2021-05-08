import * as actionTypes from "../actions/actionTypes";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
  loading: {
    sendPost: false,
    sendComment: false,
    fetchPosts: false,
    changePic: false,
  },
  error: {},
};

const sendPost = (state, action) => {
  const newObj = cloneDeep(state);
  newObj.loading.sendPost = action.loading;
  return newObj;
};

const sendComment = (state, action) => {
  const newObj = cloneDeep(state);
  newObj.loading.sendComment = action.loading;
  return newObj;
};

const fetchPosts = (state, action) => {
  const newObj = cloneDeep(state);
  newObj.loading.fetchPosts = action.loading;
  return newObj;
};

const changePic = (state, action) => {
  const newObj = cloneDeep(state);
  newObj.loading.changePic = action.loading;
  return newObj;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_SEND_POST:
      return sendPost(state, action);
    case actionTypes.LOADING_SEND_COMMENT:
      return sendComment(state, action);
    case actionTypes.LOADING_FETCH_POSTS:
      return fetchPosts(state, action);
    case actionTypes.LOADING_CHANGE_PIC:
      return changePic(state, action);
    default:
      return state;
  }
};
export default reducer;
