import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* fetchPostsSaga() {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(
      "http://localhost:4000/api/posts?_embed=comments&_sort=id&_order=desc",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = yield response.json();
    yield put(actions.successFetchPosts(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* sendNewPostSaga(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch("http://localhost:4000/api/posts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`http://localhost:4000/api/comments/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export function* fetchUsersSaga() {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch("http://localhost:4000/api/usersInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = yield response.json();
    yield put(actions.successFetchUsers(res.users));
  } catch (error) {
    yield console.log(error);
    // yield put(actions.failFetchPosts(error));
  }
}
