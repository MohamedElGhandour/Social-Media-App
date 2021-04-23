import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* fetchPostsSaga() {
  try {
    const response = yield fetch(
      "http://localhost:4000/posts?_embed=comments&_sort=id&_order=desc",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtZWRAZW1haWwuY29tIiwicGFzc3dvcmQiOiJuaWxzb24iLCJpYXQiOjE2MTkxODg4ODcsImV4cCI6MTYxOTE4ODg4N30.v23-Bsp3JrmAkPcHnlDgG3RfAfVOyS7dt7EduZ3ATcA",
        },
      }
    );
    const res = yield response.json();
    yield console.log(res);
    yield put(actions.successFetchPosts(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* sendNewPostSaga(action) {
  try {
    const response = yield fetch("http://localhost:4000/posts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(action.data), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successSendNewPost(res));
  } catch (error) {
    yield put(actions.failFetchPosts(error));
  }
}

export function* addCommentSaga(action) {
  try {
    const response = yield fetch(`http://localhost:4000/comments/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(action.comment), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successAddComment(action.data, res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}
