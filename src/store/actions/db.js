import * as actionTypes from "./actionTypes";

export const fetchPosts = () => ({
  type: actionTypes.FETCH_POSTS,
});

export const successFetchPosts = (posts) => ({
  type: actionTypes.SUCCESS_FETCH_POSTS,
  posts: posts,
});

export const fetchNews = () => ({
  type: actionTypes.FETCH_NEWS,
});

export const successFetchNews = (posts) => ({
  type: actionTypes.SUCCESS_FETCH_NEWS,
  posts: posts,
});

export const fetchProfile = (id) => ({
  type: actionTypes.FETCH_PROFILE,
  id: id,
});

export const successFetchProfile = (posts) => ({
  type: actionTypes.SUCCESS_FETCH_PROFILE,
  posts: posts,
});

export const failFetchPosts = (error) => ({
  type: actionTypes.FAILED_FETCH_POSTS,
  error: error,
});

export const sendNewPost = (data, postType) => ({
  type: actionTypes.SEND_NEW_POST,
  data: data,
  postType: postType,
});

export const successSendNewPost = (data, postType) => ({
  type: actionTypes.SUCCESS_SEND_NEW_POST,
  data: data,
  postType: postType,
});

export const addComment = (data, comment, postType) => ({
  type: actionTypes.ADD_COMMENT,
  data: data,
  comment: comment,
  postType: postType,
});

export const successAddComment = (data, comment, postType) => ({
  type: actionTypes.SUCCESS_ADD_COMMENT,
  data: data,
  comment: comment,
  postType: postType,
});

export const toggleLove = (post, postType) => ({
  type: actionTypes.TOGGLE_LOVE,
  post: post,
  postType: postType,
});

export const successToggleLove = (post, postType) => ({
  type: actionTypes.SUCCESS_TOGGLE_LOVE,
  post: post,
  postType: postType,
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

export const changeAvatar = (id, avatar) => ({
  type: actionTypes.CHANGE_AVATAR,
  id: id,
  avatar: avatar,
});

export const successChangeAvatar = (users) => ({
  type: actionTypes.SUCCESS_CHANGE_AVATAR,
  users: users,
});

export const changeCover = (id, cover) => ({
  type: actionTypes.CHANGE_COVER,
  id: id,
  cover: cover,
});

export const successChangeCover = (users) => ({
  type: actionTypes.SUCCESS_CHANGE_COVER,
  users: users,
});
