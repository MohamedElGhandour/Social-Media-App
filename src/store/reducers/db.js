import * as actionTypes from "../actions/actionTypes";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
  posts: [],
  images: [],
  profile: null,
  error: null,
  users: [],
  search: [],
  notFoundUser: false,
  loadMore: true,
  page: 1,
};

const successFetchPosts = (state, action) => {
  let loadMore = true;
  if (action.data.length === 0) loadMore = false;
  return {
    ...state,
    posts: [...state.posts, ...action.data],
    loadMore: loadMore,
    page: state.page + 1,
  };
};
const successFetchImages = (state, action) => {
  let loadMore = true;
  if (action.data.data.length === 0) loadMore = false;
  return {
    ...state,
    images: [...state.images, ...action.data.data],
    loadMore: loadMore,
    page: state.page + 1,
  };
};
const successFetchNews = (state, action) => {
  let loadMore = true;
  if (action.posts.data.length === 0) loadMore = false;
  return {
    ...state,
    posts: [...state.posts, ...action.posts.data],
    loadMore: loadMore,
    page: state.page + 1,
  };
};

const successFetchUser = (state, action) => {
  if (action.typeFetch === "post") {
    let loadMore = true;
    if (action.data.posts.length === 0) loadMore = false;
    return {
      ...state,
      posts: [...state.posts, ...action.data.posts],
      loadMore: loadMore,
      page: state.page + 1,
    };
  } else if (action.typeFetch === "profile") {
    return {
      ...state,
      profile: action.data.user,
    };
  }
};

const failedFetchPosts = (state, action) => {
  return { ...state, error: action.error };
};

const successSendNewPost = (state, action) => {
  const newArr = cloneDeep(state.posts);
  newArr.unshift(action.data.data);
  return { ...state, posts: newArr };
};

const successAddComment = (state, action) => {
  const _Posts = cloneDeep(state.posts);
  const _NewPost = action.data;
  _Posts.forEach((post) => {
    if (post._id === _NewPost._id) {
      post.comments = _NewPost.comments;
    }
  });
  return { ...state, posts: _Posts };
};

const successFetchUsers = (state, action) => ({ ...state, users: action.data });

const successToggleLove = (state, action) => {
  const _Posts = cloneDeep(state.posts);
  const _NewPost = action.post;
  _Posts.forEach((post) => {
    if (_NewPost._id === post._id) {
      post.loves = _NewPost.loves;
    }
  });
  return { ...state, posts: _Posts };
};

const successUpdateAvatar = (state, action) => {
  localStorage.setItem("avatar", action.data.data.avatar);
  const currentUser = action.data.data;
  const _Users = cloneDeep(state.users);
  const _Profile = cloneDeep(state.profile);
  const _Posts = cloneDeep(state.posts);
  _Profile.avatar = currentUser.avatar;
  _Posts.forEach((post) => {
    post.user.avatar = currentUser.avatar;
  });
  _Users.forEach((user) => {
    if (user._id === currentUser._id) {
      user.avatar = currentUser.avatar;
    }
  });
  return { ...state, profile: _Profile, users: _Users, posts: _Posts };
};

const successUpdateCover = (state, action) => {
  localStorage.setItem("cover", action.data.data.cover);
  const currentUser = action.data.data;
  const _Users = cloneDeep(state.users);
  const _Profile = cloneDeep(state.profile);
  _Profile.cover = currentUser.cover;
  _Users.forEach((user) => {
    if (user._id === currentUser._id) {
      user.cover = currentUser.cover;
    }
  });
  return { ...state, profile: _Profile, users: _Users };
};

const successFollowSystem = (state, action) => {
  const _Users = cloneDeep(state.users);
  const _Profile = cloneDeep(state.profile);
  const _Posts = cloneDeep(state.posts);
  const currentUser = action.data.data.currentUser;
  const targetUser = action.data.data.targetUser;
  localStorage.setItem("followers", JSON.stringify(currentUser.followers));
  localStorage.setItem("requests", JSON.stringify(currentUser.requests));
  localStorage.setItem("following", JSON.stringify(currentUser.following));
  localStorage.setItem("pending", JSON.stringify(currentUser.pending));
  if (state.profile)
    if (state.profile._id === targetUser._id) {
      _Profile.following = targetUser.following;
      _Profile.followers = targetUser.followers;
      _Profile.pending = targetUser.pending;
      _Profile.requests = targetUser.requests;
    }
  _Posts.forEach((post) => {
    if (post.user._id === targetUser._id) {
      post.user.following = targetUser.following;
      post.user.followers = targetUser.followers;
      post.user.pending = targetUser.pending;
      post.user.requests = targetUser.requests;
    }
  });
  _Users.forEach((user) => {
    if (user._id === currentUser._id) {
      user.following = currentUser.following;
      user.followers = currentUser.followers;
      user.pending = currentUser.pending;
      user.requests = currentUser.requests;
    } else if (user._id === targetUser._id) {
      user.following = targetUser.following;
      user.followers = targetUser.followers;
      user.pending = targetUser.pending;
      user.requests = targetUser.requests;
    }
  });
  return { ...state, users: _Users, profile: _Profile, posts: _Posts };
};

const successSearchUser = (state, action) => {
  return { ...state, search: action.users };
};

const userNotFound = (state, action) => ({
  ...state,
  notFoundUser: action.isFound,
});

const resetScrollPage = (state, action) => ({
  ...state,
  page: 1,
  loadMore: true,
  posts: [],
  images: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_FETCH_POSTS:
      return successFetchPosts(state, action);
    case actionTypes.SUCCESS_FETCH_NEWS:
      return successFetchNews(state, action);
    case actionTypes.SUCCESS_FETCH_USER:
      return successFetchUser(state, action);
    case actionTypes.SUCCESS_FETCH_IMAGES:
      return successFetchImages(state, action);
    case actionTypes.FAILED_FETCH_POSTS:
      return failedFetchPosts(state, action);
    case actionTypes.SUCCESS_SEND_NEW_POST:
      return successSendNewPost(state, action);
    case actionTypes.SUCCESS_ADD_COMMENT:
      return successAddComment(state, action);
    case actionTypes.SUCCESS_FETCH_USERS:
      return successFetchUsers(state, action);
    case actionTypes.SUCCESS_TOGGLE_LOVE:
      return successToggleLove(state, action);
    case actionTypes.SUCCESS_FOLLOW_SYSTEM:
      return successFollowSystem(state, action);
    case actionTypes.SUCCESS_CHANGE_AVATAR:
      return successUpdateAvatar(state, action);
    case actionTypes.SUCCESS_CHANGE_COVER:
      return successUpdateCover(state, action);
    case actionTypes.SUCCESS_SEARCH_USER:
      return successSearchUser(state, action);
    case actionTypes.USER_NOT_FOUND:
      return userNotFound(state, action);
    case actionTypes.RESET_SCROLL_PAGE:
      return resetScrollPage(state, action);
    default:
      return state;
  }
};
export default reducer;
