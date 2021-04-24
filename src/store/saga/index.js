import { takeEvery, all } from "redux-saga/effects";
import { fetchPostsSaga, sendNewPostSaga, addCommentSaga } from "./posts";
import {
  authSaga,
  authLogoutSaga,
  authCheckStateSaga,
  checkAuthTimeoutSaga,
} from "./auth";

import * as actionTypes from "../actions/actionTypes";

export function* watchPosts() {
  yield all([
    takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga),
    takeEvery(actionTypes.SEND_NEW_POST, sendNewPostSaga),
    takeEvery(actionTypes.ADD_COMMENT, addCommentSaga),
  ]);
}

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH, authSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga),
    takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}
