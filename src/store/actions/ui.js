import * as actionTypes from "./actionTypes";

export const loadingSendPost = (loading) => ({
  type: actionTypes.LOADING_SEND_POST,
  loading: loading,
});

export const loadingSendComment = (loading) => ({
  type: actionTypes.LOADING_SEND_COMMENT,
  loading: loading,
});

export const loadingFetchPosts = (loading) => ({
  type: actionTypes.LOADING_FETCH_POSTS,
  loading: loading,
});

export const loadingChangePic = (loading) => ({
  type: actionTypes.LOADING_CHANGE_PIC,
  loading: loading,
});
