import * as actionTypes from "./actionTypes";

export const fetchPosts = () => ({ type: actionTypes.FETCH_POSTS });

export const successFetchPosts = (posts) => ({
  type: actionTypes.SUCCESS_FETCH_POSTS,
  posts: posts,
});

export const failFetchPosts = (error) => ({
  type: actionTypes.FAILED_FETCH_POSTS,
  error: error,
});

export const sendNewPost = (data) => ({
  type: actionTypes.SEND_NEW_POST,
  data: data,
});

export const successSendNewPost = (data) => ({
  type: actionTypes.SUCCESS_SEND_NEW_POST,
  data: data,
});

export const addComment = (data, comment) => ({
  type: actionTypes.ADD_COMMENT,
  data: data,
  comment: comment,
});

export const toggleLove = (post) => ({
  type: actionTypes.TOGGLE_LOVE,
  post: post,
});

export const successToggleLove = (post) => ({
  type: actionTypes.SUCCESS_TOGGLE_LOVE,
  post: post,
});

export const successAddComment = (data, comment) => ({
  type: actionTypes.SUCCESS_ADD_COMMENT,
  data: data,
  comment: comment,
});

export const fetchUsers = () => ({ type: actionTypes.FETCH_USERS });

export const successFetchUsers = (data) => ({
  type: actionTypes.SUCCESS_FETCH_USERS,
  data: data,
});

export const toggleFollow = (id, userId, isAccepted) => ({
  type: actionTypes.TOGGLE_FOLLOW,
  id: id,
  userId: userId,
  isAccepted: isAccepted,
});

export const toggleRequest = (id, userId) => ({
  type: actionTypes.TOGGLE_REQUEST,
  id: id,
  userId: userId,
});

export const successToggleRequest = (users) => ({
  type: actionTypes.SUCCESS_TOGGLE_REQUEST,
  users: users,
});

export const successToggleFollow = (users) => ({
  type: actionTypes.SUCCESS_TOGGLE_FOLLOW,
  users: users,
});
