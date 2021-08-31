import { takeEvery, all } from "redux-saga/effects";
import {
  fetchPostsSaga,
  sendNewPostSaga,
  addCommentSaga,
  fetchUsersSaga,
  toggleLoveSaga,
  follow,
  cancel,
  unfollow,
  accept,
  decline,
  fetchImagesSaga,
  fetchNewsSaga,
  fetchProfileSaga,
  changeAvatarSaga,
  changeCoverSaga,
  uploadImageSaga,
  searchUsersSaga,
} from "./db";
import {
  authSaga,
  authLogoutSaga,
  authCheckStateSaga,
  checkAuthTimeoutSaga,
  fetchCurrentUser,
} from "./auth";

import * as actionTypes from "../actions/actionTypes";

export function* watchDb() {
  yield all([
    takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga),
    takeEvery(actionTypes.FETCH_NEWS, fetchNewsSaga),
    takeEvery(actionTypes.FETCH_USER, fetchProfileSaga),
    takeEvery(actionTypes.SEND_NEW_POST, sendNewPostSaga),
    takeEvery(actionTypes.ADD_COMMENT, addCommentSaga),
    takeEvery(actionTypes.FETCH_USERS, fetchUsersSaga),
    takeEvery(actionTypes.TOGGLE_LOVE, toggleLoveSaga),
    takeEvery(actionTypes.FOLLOW, follow),
    takeEvery(actionTypes.ACCEPT, accept),
    takeEvery(actionTypes.DECLINE, decline),
    takeEvery(actionTypes.CANCEL, cancel),
    takeEvery(actionTypes.UNFOLLOW, unfollow),
    takeEvery(actionTypes.FETCH_IMAGES, fetchImagesSaga),
    takeEvery(actionTypes.CHANGE_AVATAR, changeAvatarSaga),
    takeEvery(actionTypes.CHANGE_COVER, changeCoverSaga),
    takeEvery(actionTypes.UPLOAD_IMAGE, uploadImageSaga),
    takeEvery(actionTypes.SEARCH_USER, searchUsersSaga),
  ]);
}

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH, authSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga),
    takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.CURRENT_USER, fetchCurrentUser),
  ]);
}
