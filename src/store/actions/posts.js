import * as actionTypes from "./actionTypes";

export const fetchPosts = () => {
  return {
    type: actionTypes.FETCH_POSTS,
  };
};

export const successFetchPosts = (posts) => {
  return {
    type: actionTypes.SUCCESS_FETCH_POSTS,
    posts: posts,
  };
};

export const failFetchPosts = (error) => {
  return {
    type: actionTypes.FAILED_FETCH_POSTS,
    error: error,
  };
};

export const sendNewPost = (data) => {
  return {
    type: actionTypes.SEND_NEW_POST,
    data: data,
  };
};

export const successSendNewPost = (data) => {
  return {
    type: actionTypes.SUCCESS_SEND_NEW_POST,
    data: data,
  };
};

export const addComment = (data, comment) => {
  return {
    type: actionTypes.ADD_COMMENT,
    data: data,
    comment: comment,
  };
};

export const successAddComment = (data, comment) => {
  return {
    type: actionTypes.SUCCESS_ADD_COMMENT,
    data: data,
    comment: comment,
  };
};
