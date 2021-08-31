import * as actionTypes from "./actionTypes";

export const fetchPosts = () => ({
  type: actionTypes.FETCH_POSTS,
});

export const successFetchPosts = (data) => ({
  type: actionTypes.SUCCESS_FETCH_POSTS,
  data: data,
});

export const fetchImages = () => ({
  type: actionTypes.FETCH_IMAGES,
});

export const successFetchImages = (data) => ({
  type: actionTypes.SUCCESS_FETCH_IMAGES,
  data: data,
});

export const fetchNews = () => ({
  type: actionTypes.FETCH_NEWS,
});

export const successFetchNews = (posts) => ({
  type: actionTypes.SUCCESS_FETCH_NEWS,
  posts: posts,
});

export const fetchUser = (id, typeFetch) => ({
  type: actionTypes.FETCH_USER,
  id: id,
  typeFetch: typeFetch,
});

export const successFetchUser = (data, typeFetch) => ({
  type: actionTypes.SUCCESS_FETCH_USER,
  data: data,
  typeFetch: typeFetch,
});

export const failFetchPosts = (error) => ({
  type: actionTypes.FAILED_FETCH_POSTS,
  error: error,
});

export const uploadImage = (data, types) => ({
  type: actionTypes.UPLOAD_IMAGE,
  data: data,
  types: types,
});

export const sendNewPost = (data) => ({
  type: actionTypes.SEND_NEW_POST,
  data: data,
});

export const successSendNewPost = (data, postType) => ({
  type: actionTypes.SUCCESS_SEND_NEW_POST,
  data: data,
  postType: postType,
});

export const addComment = (data) => ({
  type: actionTypes.ADD_COMMENT,
  data: data,
});

export const successAddComment = (data) => ({
  type: actionTypes.SUCCESS_ADD_COMMENT,
  data: data,
});

export const toggleLove = (id, postType) => ({
  type: actionTypes.TOGGLE_LOVE,
  id: id,
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

export const follow = (followId) => ({
  type: actionTypes.FOLLOW,
  followId: followId,
});

export const unfollow = (unfollowId) => ({
  type: actionTypes.UNFOLLOW,
  unfollowId: unfollowId,
});

export const cancel = (cancelId) => ({
  type: actionTypes.CANCEL,
  cancelId: cancelId,
});

export const decline = (declineId) => ({
  type: actionTypes.DECLINE,
  declineId: declineId,
});

export const accept = (acceptId) => ({
  type: actionTypes.ACCEPT,
  acceptId: acceptId,
});

export const successFollowSystem = (data) => ({
  type: actionTypes.SUCCESS_FOLLOW_SYSTEM,
  data: data,
});
export const changeAvatar = (avatar) => ({
  type: actionTypes.CHANGE_AVATAR,
  data: avatar,
});

export const successChangeAvatar = (data) => ({
  type: actionTypes.SUCCESS_CHANGE_AVATAR,
  data: data,
});

export const changeCover = (cover) => ({
  type: actionTypes.CHANGE_COVER,
  data: cover,
});

export const successChangeCover = (data) => ({
  type: actionTypes.SUCCESS_CHANGE_COVER,
  data: data,
});

export const searchUser = (name) => ({
  type: actionTypes.SEARCH_USER,
  name: name,
});

export const successSearchUser = (users) => ({
  type: actionTypes.SUCCESS_SEARCH_USER,
  users: users,
});

export const userNotFound = (isFound) => ({
  type: actionTypes.USER_NOT_FOUND,
  isFound: isFound,
});

export const restScrollPage = () => ({
  type: actionTypes.RESET_SCROLL_PAGE,
});
