import { takeEvery, all } from "redux-saga/effects";
import { fetchPostsSaga, sendNewPostSaga, addCommentSaga } from "./posts";
import * as actionTypes from "../actions/actionTypes";

export function* watchPosts() {
  yield all([
    takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga),
    takeEvery(actionTypes.SEND_NEW_POST, sendNewPostSaga),
    takeEvery(actionTypes.ADD_COMMENT, addCommentSaga),
  ]);
}
