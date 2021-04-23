import * as actionTypes from "../actions/actionTypes";
import cloneDeep from "lodash/cloneDeep";

const initialState = { posts: [], error: null };

const successFetchPosts = (state, action) => {
  return { ...state, posts: action.posts };
};
const failedFetchPosts = (state, action) => {
  return { ...state, error: action.error };
};

const successSendNewPost = (state, action) => {
  const newArr = cloneDeep(state.posts);
  newArr.unshift(action.data);
  return { ...state, posts: newArr };
};

const successAddComment = (state, action) => {
  const newState = cloneDeep(state);
  newState.posts.forEach((post) => {
    if (action.data.id === post.id) {
      post.comments.push(action.comment);
    }
  });
  return { ...newState };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_FETCH_POSTS:
      return successFetchPosts(state, action);
    case actionTypes.FAILED_FETCH_POSTS:
      return failedFetchPosts(state, action);
    case actionTypes.SUCCESS_SEND_NEW_POST:
      return successSendNewPost(state, action);
    case actionTypes.SUCCESS_ADD_COMMENT:
      return successAddComment(state, action);
    default:
      return state;
  }
};
export default reducer;
